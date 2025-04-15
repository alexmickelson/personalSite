from pprint import pprint
from typing import List
import pandas as pd
import numpy as np
import json
import os
import requests
from dotenv import load_dotenv
import psycopg
from pgvector.psycopg import register_vector

load_dotenv()

# https://www.timescale.com/blog/postgresql-as-a-vector-database-create-store-and-query-openai-embeddings-with-pgvector
openwebui_token = os.getenv("OPENWEBUI_TOKEN")
connection_string = os.getenv("DATABASE_URL")
if not connection_string:
    raise ValueError("DATABASE_URL is not set in the environment.")
if not openwebui_token:
    raise ValueError("OPENWEBUI_TOKEN is not set in the environment.")


def read_files_to_dataframe(folder_path: str):
    data = []
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        if os.path.isfile(file_path):  # Ensure it's a file
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
                data.append({"file_name": file_name, "file_content": content})

    return pd.DataFrame(data)


def generate_embeddings(content: str) -> List[float]:
    # not doing chunking
    # do with browser? https://github.com/huggingface/transformers.js/issues/3

    endpoint_url = "http://nixos-vm:8080/ollama/api/embed"
    # model = "nomic-embed-text"
    model = "mxbai-embed-large"
    payload = {"model": "nomic-embed-text", "input": [content]}
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openwebui_token}",
    }
    response = requests.post(endpoint_url, json=payload, headers=headers)

    if response.status_code != 200:
        raise f"Error: {response.status_code}, {response.text}"

    # pprint(len(response.json()['embeddings'][0]))
    return response.json()["embeddings"][0]


def insert_embeddings_to_db(df: pd.DataFrame):
    with psycopg.connect(connection_string) as conn:
        try:
            with conn.cursor() as cur:
                insert_query = """
                    INSERT INTO embeddings (file_name, file_contents, embedding)
                    VALUES (%(file_name)s, %(file_content)s, %(embedding)s)
                """
                for i, row in df.iterrows():
                    cur.execute(
                        insert_query,
                        {
                            "file_name": row["file_name"],
                            "file_content": row["file_content"],
                            "embedding": row["embeddings"],
                        },
                    )
                conn.commit()
        except Exception as e:
            print(f"Error inserting data into PostgreSQL: {e}")
            conn.rollback()
        finally:
            cur.close()
            conn.close()

def search_similar(search_term: str):
    with psycopg.connect(connection_string) as conn:
        with conn.cursor() as cur:
            # conn.execute('CREATE EXTENSION IF NOT EXISTS vector')
            register_vector(conn)
            search_query = """
                SELECT file_name, file_contents, embedding
                FROM embeddings
                ORDER BY embedding <-> %s::vector
                --LIMIT 5
            """
            first_list = generate_embeddings(search_term)
            # pprint(first_list)
            # print(len(first_list))
            # query_embedding = np.array(first_list)
            cur.execute(search_query, (first_list,))

            top_values = cur.fetchall()
            return top_values


if __name__ == "__main__":
    folder_path = "../pages"
    df = read_files_to_dataframe(folder_path)
    df["embeddings"] = df["file_content"].apply(
        lambda content: generate_embeddings(content)
    )

    # print(df.head())

    # insert_embeddings_to_db(df)

    # works better with longer prompts...
    result = search_similar("styling things and web development")
    for r in result[:3]:
       print(r[0])
       print(r[1])
       print("##############################################")

from pprint import pprint
import pandas as pd
import numpy as np
import json
import os
import requests

from dotenv import load_dotenv

load_dotenv()

# https://www.timescale.com/blog/postgresql-as-a-vector-database-create-store-and-query-openai-embeddings-with-pgvector
openwebui_token = os.getenv("OPENWEBUI_TOKEN")
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


def generate_embeddings(content: str):
    # not doing chunking

    endpoint_url = "http://nixos-vm:8080/ollama/api/embed"
    payload = {"model": "nomic-embed-text", "input": [content]}
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openwebui_token}",
    }
    response = requests.post(endpoint_url, json=payload, headers=headers)

    if response.status_code != 200:
        raise f"Error: {response.status_code}, {response.text}"

    pprint(len(response.json()['embeddings'][0]))
    return response.json()


if __name__ == "__main__":
    folder_path = "../pages"

    # Read files into a DataFrame
    df = read_files_to_dataframe(folder_path)

    # Generate embeddings for each file content
    df["embeddings"] = df["file_content"].apply(
        lambda content: generate_embeddings(content)
    )

    print(df.head())

# Virtual environments

All config stored in a .devcontainer folder in the root of the git repo

The primary config is in the .devcontainer/devcontainer.json file

example:
```json
{
	"name": "Personal Site",
	"dockerComposeFile": [
		"docker-compose.yml"
	],
	"workspaceFolder": "/app",
	"shutdownAction": "stopCompose",
	"service": "editor",
	"settings": {},
	"extensions": [
		"dbaeumer.vscode-eslint",
		"dsznajder.es7-react-js-snippets",
		"ms-azuretools.vscode-docker",
		"esbenp.prettier-vscode"
	],
	"remoteUser": "node",
	"features": {
		"docker-from-docker": "latest"
	}
}
```

Example .devcontainer/docker-compose.yml
```yml
version: "3.8"
services:
  editor:
    build: .
    volumes:
      - ../:/app
      - ./.bashrc:/home/developer/.bashrc
      - virtualenv:/home/developer/virtualenv
      - developer_home:/home/developer
    working_dir: /app
    user: root
    command: |
      bash -c "
        chown -R developer:developer /home/developer/
        chown -R developer:developer /home/developer/virtualenv
        su - developer
        tail -f /dev/null
      "

  client:
    build: .
    volumes:
      - ../:/app
    working_dir: /app/client
    user: developer
    command: |
      bash -c "
        npm install
        npm start
      "
    ports:
      - 8080:8080

  api:
    build: .
    volumes:
      - ../:/app
      - virtualenv:/home/developer/virtualenv
    working_dir: /app/api
    command: |
      bash -c "
        chown -R developer:developer /home/developer/virtualenv
        python -m venv /home/developer/virtualenv
        
        su - developer
        source /home/developer/virtualenv/bin/activate
        pip install -r requirements.txt
        uvicorn main:app --reload --port 8080 --host 0.0.0.0
      "

volumes:
  virtualenv:
  developer_home:
```

Important bits to noteL:
- we are running everything as the developer user
  - this users UID and GID should match our own
    - if they do not, we will need admin access to modify the files outside the container

### Editor Container:

- we are passing through our .ssh folder for git compatibility
- we are storing the developer's home directory in a volume so we dont need to re-download vscode extensions everytime we re-create the container
- since the virtualenv is in its own container it is owned by root by default
- the editor container only exists to attach our vscode window to a container
  - it runs no other processes
  - it cannot stop, so we continuously output nothing

### Client Container:

- the client recieves all traffic
  - the react dev server proxies traffic to the api from client/src/setupProxy.js
- dependencies are shared between the client and editor containers via the node_modules folder

### Api Container:

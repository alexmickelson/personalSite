FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-20-bullseye

RUN apt-get update && apt-get install -y \
    fish git \
    python3 python3-venv \
  && python3 -m venv /home/node/venv



RUN fish
COPY ./config.fish /home/node/.config/fish/config.fish



CMD ["tail", "-f", "/dev/null"]
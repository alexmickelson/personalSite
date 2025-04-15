FROM ubuntu:24.04

RUN apt-get update && apt-get install -y \
    fish git \
    python3 python3-venv \
    nodejs
RUN pnpm install -g pnpm

    
WORKDIR /app
    
RUN usermod -l developer ubuntu && \
    usermod -d /home/developer -m developer && \
    groupmod -n developer ubuntu && \
    chsh -s /usr/bin/fish developer

USER developer
RUN python3 -m venv /home/developer/venv

RUN fish
COPY ./config.fish /home/developer/.config/fish/config.fish



CMD ["tail", "-f", "/dev/null"]
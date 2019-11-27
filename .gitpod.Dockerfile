FROM gitpod/workspace-full
FROM python:3.7

USER root


# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
RUN apt-get update \
   && apt-get install -y bastet \
    pip install --update pip && \
    pip install --update setuptools && \
    pip install eel
#    && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/

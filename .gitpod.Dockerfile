FROM python:3.7

USER root

RUN apt-get update && apt-get install -y bastet && \
  apt-get install -y libfontconfig && \
  mkdir -p /home/root/src && cd $_ && \
  wget -q -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip && \
  unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/ && \
  apt-get install -y libappindicator1 fonts-liberation libasound2 libnspr4 libnss3 libxss1 lsb-release xdg-utils && \
  touch /etc/default/google-chrome && \
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
  dpkg -i google-chrome-stable_current_amd64.deb && \
  apt-get install -y fonts-migmix

# Set japanese
RUN apt-get install -y language-pack-ja-base language-pack-ja
RUN locale-gen ja_JP.UTF-8

# Set environment variables.
ENV LANG ja_JP.UTF-8
ENV PYTHONIOENCODIND utf_8
  
RUN pip install eel 
#    && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/

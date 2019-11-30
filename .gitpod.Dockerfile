FROM gitpod/workspace-full-vnc

USER root

#apt-getする際のエラ〜を解除する　https://maku77.github.io/docker/term-error.html
ENV DEBIAN_FRONTEND noninteractive

#google chrome をダウンロードするコマンド　https://qiita.com/rotelstift/items/7dafcdcae3ca18b65b26
RUN apt-get update && apt-get install -y bastet
RUN apt-get install -y apt-utils
RUN apt-get install -y libgtk-3-dev
RUN apt-get install -y libfontconfig 
RUN mkdir -p /home/root/src && cd $_ 
RUN wget -q -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/ 
RUN apt-get install -y libappindicator1 fonts-liberation libasound2 libnspr4 libnss3 libxss1 lsb-release xdg-utils 
RUN touch /etc/default/google-chrome 
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
RUN apt install -y ./google-chrome-stable_current_amd64.deb 
RUN apt-get install -y fonts-migmix

RUN apt-get install -y python3-dev
RUN apt-get install -y python-dev

# Set japanese
RUN apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
RUN echo "export LANG=ja_JP.UTF-8"

# Set environment variables.
ENV LANG ja_JP.UTF-8
ENV PYTHONIOENCODIND utf_8git

RUN pyenv install 3.6.4
RUN pyenv global 3.6.4
RUN pip install --upgrade pip
RUN pip install eel 
#    && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/

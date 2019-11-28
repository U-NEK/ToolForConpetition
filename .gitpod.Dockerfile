FROM python:3.7

USER root

RUN apt-get update && apt-get install -y bastet && \
    wget -q -O /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i /tmp/google-chrome-stable_current_amd64.deb \
    ; apt-get -qqyf install

#Japanese fonts install
RUN wget -q --content-disposition -O /tmp/IPAfont00303.zip http://ipafont.ipa.go.jp/old/ipafont/IPAfont00303.php \
    && unzip /tmp/IPAfont00303.zip -d /usr/share/fonts/ \
    && fc-cache -fv
  
RUN pip install eel 
#    && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/

FROM arm32v7/nginx
#FROM haproxy
RUN apt update && apt -y install git
RUN cd /tmp/ && git clone https://github.com/efip-farmasalud/farmasalud-front 
RUN cp -r /tmp/farmasalud-front/*  /usr/share/nginx/html/


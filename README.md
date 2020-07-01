# farmasalud-front

#testeada en una raspberry pi 4
Correr app 

path_static=/tmp/

git clone https://github.com/efip-farmasalud/farmasalud ${path_static}

docker run -t -d --name farmasalud -v /etc/hosts:/etc/hosts -v ${path_static}:/usr/share/nginx/html/ -p 38080:80  --restart always -d arm32v7/nginx:latest

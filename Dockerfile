FROM node

WORKDIR /usr/src/app

COPY package.json package.json

RUN apt update && apt upgrade -y && apt install redis-server -y && npm install

COPY . .

EXPOSE 3030

CMD ["/bin/bash", "-c", "chmod +x run.sh && ./run.sh"]
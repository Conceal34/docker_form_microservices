FROM node:22-alpine3.22

ADD . /app

WORKDIR /app

RUN npm install

ENTRYPOINT [ "node" ]

CMD [ "index.js" ]
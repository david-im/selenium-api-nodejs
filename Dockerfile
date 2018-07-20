FROM node:8-slim
MAINTAINER David Im <david@ntcon.co>

WORKDIR /

COPY package*.json ./

RUN npm install

COPY .. .

#가상 머신에 오픈할 포트
EXPOSE 8080

#컨테이너에서 실행될 명령을 지정
CMD ["npm", "start"]
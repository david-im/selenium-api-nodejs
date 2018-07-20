selenium-api-nodejs

##Getting Start
1. Node.js 패키지 설치

        npm i
    
2. 실행

        npm start
        
      또는

        node app.js

##환경변수

DRIVER_COUNT : 해당 서비스에서 사용할 Driver 개수(default: 5)

HEADLESS : 해당 서비스의 드라이버들이 Headless모드로 사용될건지 여부(default: true)

##도커 빌드

    sudo docker build -t selenium-api-nodejs:0.0.1

## 도커 실행

    sudo docker run -e DRIVER_COUNT=5 -e HEADLESS=true selenium-api-nodejs:0.0.1
    

###Connecting PostgreSQL Client using the Proxy Docker Image
PostgreSQL

    docker run --name cloud-sql-proxy-treasurney -d -v /cloudsql:/cloudsql -v /d/key/treasurney:/config -p 5432:5432 gcr.io/cloudsql-docker/gce-proxy:1.11 /cloud_sql_proxy -instances=ntcon-dev:asia-northeast1:treasurney=tcp:0.0.0.0:5432 -credential_file=/config/treasurney-cloud-proxy.json

MySQL
    
    docker run --name cloud-sql-proxy-treasurney-mysql -d -v /cloudsql:/cloudsql -v /d/key/treasurney:/config -p 3306:3306 gcr.io/cloudsql-docker/gce-proxy:1.11 /cloud_sql_proxy -instances=ntcon-dev:asia-northeast1:treasurney-mysql=tcp:0.0.0.0:3306 -credential_file=/config/treasurney-cloud-proxy.json
    
#### PostGIS Extension 설정
적용할 데이터베이스에서 아래 Query문 실행

    CREATE EXTENSION postgis;
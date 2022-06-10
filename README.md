## Tasks Performed 

1. Crated api to store movies and users
  API for user sign up
  API for user login
  API to add movie
  API to fetch movie


2. Used JWT to authenticate and authorize users ( Admin can create/list movies, User can only list  movies with pagination and filter to find anything in title,descrition and cast )

3. Store movies in mongoldb ( Two collections — 1) Movies, 2) Users )
4. After creating movie , a movie broadcast to slack channel


## Before start
1. Create file `.env` with credentials
Required keys:
```$xslt
PORT = 
MONGO_URL = mongodb://mongo:27019/isa-test-task
JWT_SECRET_KEY = 
SLACK_TOKEN = 
SLACK_CHANNEL =
```

## Note ::
To create a slack token need to follow this steps :: https://thecodebarbarian.com/working-with-the-slack-api-in-node-js.html#:~:text=To%20send%20a%20message%20to,the%20text%20of%20your%20message.

## Attached postman documentation  ::
https://documenter.getpostman.com/view/14304886/Uz5MDtCi

## Attached Video ::
https://drive.google.com/file/d/1OK0AXNnbGAfzWA85_sjWWElG-q0NJr7q/view?usp=sharing

## How to run project 
1. Here is the docker-compose file code
```$xslt
version: '3.5'
services:
  isa_test_task:
    restart: always
    image: jenishtagline/isa-test-task:v1.0.1
    ports:
      - 4000:3434
    volumes:
      - ./:/code
    environment: 
      PORT: ${PORT}
      MONGO_URL: ${MONGO_URL}
      JWT_SECRET_KEY: ${JWT_SECRET_KEY}
      SLACK_TOKEN: ${SLACK_TOKEN}
      SLACK_CHANNEL: ${SLACK_CHANNEL}
  mongo:
    image: mongo
    command: mongod --port 27019
    restart: always
    container_name: mongodb
    ports:
      - 27019:27019
    volumes:
      - mongodb:/data/db
volumes:
 mongodb:
```

2. Create a new docker-compose file name is docker-compose.yml
3. Copy docker-compose file code and paste it
4. Make sure docker-compose file and .env file in same directory
5. Run the following command



```$xslt
docker-compose --env-file ./.env up -d
```

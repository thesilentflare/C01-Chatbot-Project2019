# API Documentaiton

## Versions
Bcrypt v3.0.6
Express.js v4.17.1
Jsonwebtoken v8.5.1
Node.js v8.9.4
MySQL v2.17.1
MySQL2 v1.6.5
Sequelize v5.8.11
Sequelize-cli v5.5.0


## Local Development Setup
1. Install required packages
    - Installing Node.js
        - Make a bashrc file: `touch ~/.bashrc`
        - Install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`
        - `source ~/.bashrc`
        - Install node.js: `nvm install 8`
    - Intall required node packages: `npm install`
2. Update the default configs/config/config.json file
    - With proper local MySQL server credentials
    - Default config.json can be found in our Discord 'notes-and-tips' channel
3. Download MySQL server 8.0.16 from: https://dev.mysql.com/downloads/mysql/
4. Turn on your local MySQL server at 3306@localhost

## Running Server Local
- To start server: `node ./api/server.js`
- To close server: `cmd + c`

## Making Requests
### Login
- Endpoint: http://localhost:3000/login/
- Request Body: 
    ```json
    {
        "email": "test2@mail.com",
        "password": "pass"
    }
    ```
- OK Response Body:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1NjQ4NzM5MDIsImV4cCI6MTU2NDkwOTkwMn0.zz55AP8vXTlUiioEvkESjOATaLcVt_hHe2AUQaiucGo"
    }
    ```
- Possible Response Statuses:
    - 200: User logged-in
    - 400: Bad request
    ```
### Sign Up
- Endpoint: http://localhost:3000/signUp/
- Request Body:
    ```json
    {
        "firstName": "first",
        "lastName": "last",
        "gender": "m",
        "email": "test2@mail.com",
        "password": "pass",
        "admin": false,
        "respons": "somthing"
    }
    ```
- OK Response Body:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1NjQ4NzM5MDIsImV4cCI6MTU2NDkwOTkwMn0.zz55AP8vXTlUiioEvkESjOATaLcVt_hHe2AUQaiucGo"
    }
    ```
- Possible Response Statuses:
    - 200: User logged-in
    - 400: Bad request

### User
- Endpoint: http://localhost:3000/user/
- Request Body:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1NjQ4NzM5MDIsImV4cCI6MTU2NDkwOTkwMn0.zz55AP8vXTlUiioEvkESjOATaLcVt_hHe2AUQaiucGo"
    }
    ```
- OK Response Body:
    ```json
    {
        "user": {
            "first": "first",
            "last": "last",
            "email": "test@mail.com",
            "admin": false
        }
    }
    ```
- OK Response Body:
    ```json
    {
        "user": "Error meessage"
    }
    ```
- Possible Response Statuses:
    - 200: User logged-in
    - 400: Bad request
    - 404: User not found

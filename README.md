# URL Shortener Application (Day 7 Project, Module #6, MERN Stack)
![](thumbnail.png)

## Overview:
+ In this assignment, i have developed a URL shortener application that takes long URLs as input and generates shorter, more manageable links.
+ The goal is to create a service that efficiently converts lengthy URLs into concise ones, making sharing and accessing links easier for users.
+ My implementation should include key features such as generating unique short codes, redirecting users to the original URL, and tracking usage analytics. 
+ Through this assignment, i have learnt development, database management, and algorithmic considerations to build a robust and user-friendly URL shortening service.

## Key features:
+ MVC Framework was used to built the application
+ MongoDB as backend Database 
+ ExpressJS for Server Implementation
+ NodeJS for BackEnd
+ ReactJS for FrontEnd

## .env file
```javascript
USER_SESSION_EXPIRES_AFTER="2 days"
PORT=4000
PRIVATE_KEY= Create your own private key any random plain text will work
MONGODB_CONNECTION_STRING= get it from Yours MongoDB Atlas account (https://cloud.mongodb.com/)
```
### Note: 
create a database named ```urlShortnerApp``` and specify it in the MongoDB Connection string inside .env 
```javascript
<abcStringGenertedByMongoDB>mongodb.net/urlShortnerApp?retryWrites=true<xyzStringGenertedByMongoDB>
```
## To specify custom expiration values of session
```javascript
'2 days'  // 172800000
'1d'      // 86400000
'10h'     // 36000000
'2.5 hrs' // 9000000
'2h'      // 7200000
'1m'      // 60000
'5s'      // 5000
'1y'      // 31557600000
```

## How to install and run in yours local machine
```bash
npm install
npm run start
```

## Postman API Endpoints file
[Postman API Endpoints.json](m6node-day-7-project-url-shortener-application.postman_collection.json)


## API End Points : User
### 1. Sign Up
```
POST /api/v1/user/sign-up
```
#### REQUEST
```javascript
{
	email: String email address of user
	password: String Hashed password for sign-in
	firstName : String first name of user
	lastName : String last name of user
}
```
#### RESPONSE
```javascript
{
    "success": true,
    "message": "User Account created successfully !",
    "auth-token": "JWT Auth Token"
}
```
### 2. Sign In
```
POST /api/v1/user/sign-in
```
#### REQUEST
```javascript
{
 email: String email address of user
 password: String Hashed password for sign-in
}
```
#### RESPONSE
```javascript
{
    "success": true,
    "message": "JWT Auth Token"
}

```
### 3. Validate Auth Token
```
POST /api/v1/user/validate-auth-token
```
#### REQUEST
```javascript
Headers
{ auth-token : JWT Auth Token as received after sign in or up}
```
#### RESPONSE
```javascript
{
    "isAuthTokenValid": true
}
```

## API End Points : UrlShortener
### 1. Short URL
```
POST /api/v1/short-url
```
#### REQUEST
```javascript
HEADERS
{
'auth-token' : "JWT Auth Token as provided earlier after sign-in or up"
}
BODY
 {
   destinationURL: say https://github.com/Alex21c
   customBackHalf: (optional) say alex21cGitHub
 }
```
#### RESPONSE
```javascript
{
    "success": true,
    "message": "User Account created successfully !",
    "auth-token": "JWT Auth Token"
}
```
### 2. Access shorted URL
```
GET /URLBackHalf
```
#### REQUEST
NA
#### RESPONSE
Redirect user to desination url

```
### 3. Get all URLs shorted by current User
```
POST /get-all-urls-created-by-current-user
```
#### REQUEST
```javascript
HEADERS
{
'auth-token' : "JWT Auth Token as provided earlier after sign-in or up"
}

```
#### Example RESPONSE
```javascript
{
    "success": true,
    "body": [
        {
            "traffic": 1,
            "shortedURI": "OCdweRUXv",
            "shortedURL": "https://domainName/OCdweRUXv",
            "destinationURL": "https://github.com/Alex21c"
        },
        {
            "traffic": 0,
            "shortedURI": "OjMdXDCxV",
            "shortedURL": "https://domainName/OjMdXDCxV",
            "destinationURL": "https://classroom.google.com/"
        }
}
```

### 4. Perform handshake with the server, in case render has spun off the instance, it should re mount it
#### REQUEST
```
GET /handshake/hello
```

#### RESPONSE

```javascript
{
    "success": true,
    "message": "hi there!"
}
```


## Tech. Stack Used:
+ [MongoDB](https://www.mongodb.com/) 
+ [ExpressJS](https://expressjs.com/) 
+ [ReactJS](https://react.dev/) 
+ [NodeJS](https://nodejs.org/en/) 

## Author
[Abhishek kumar](https://www.linkedin.com/in/alex21c/), ([Geekster](https://geekster.in/) MERN Stack FS-14 Batch)



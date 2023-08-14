# TINY URL 🚀
Node URL Shortener API

## USED TOOLS

nanoId for generating code for URLs
Winston Logger
Swagger and Document are available
Jest and Supertest for End to end testing.
Bcryptjs for hashing the password for more security.
MongoDB for storing users and URLs.

## HOW TO RUN IT?

### PREINSTALL

for installing all dependencies open the terminal in that directory and run :
npm install

### RUN IT
open the terminal in that directory and run:
npm start

## TEST

open the terminal in that directory and run:
npm test

## Endpoints

### USER SIGNUP

POST /api/auth/signup

#### parameters

{
    "email": "a valid email address",
    "password": "a strong valid password",
}
 #### result

{
    "message": "user successfully created now you can log in with it!",
}

### USER LOGIN

POST /api/auth/login

#### parameters

{
    "email": "a valid email address",
    "password": "a strong valid password",
}
 #### result

{
    "message": "Congrats your in",
    "token": "a token generated with jsowebtoken",
}

### CREATE SHORT URL

POST /api/url/shorten

#### parameters

Headers:{
    Authorization:"token that given while logining"
}
{
    "longUrl": "a valid url",
}
#### result

{
    "urlCode": "code generated with shortid library",
    "longUrl": "your long url",
    "shortUrl": "generated short url",
}

### GET USER URLs

POST /api/url/

#### parameters

Headers:{
    Authorization:"token that given while logining"
}

 #### result

[{
    "urlCode": "code generated with shortid library",
    "longUrl": "your long url",
    "shortUrl": "generated short url",
},
]

### DELETE USER URL

DELETE /api/url/:code

#### parameters

Headers:{
    Authorization:"token that given while logining"
}

 #### result

{
    "message": "URL deleted!"
}

### REDIRECT TO ORIGINAL URL

GET /:code

#### result

Redirect to the original URL.

### SwaggerUI

GET /api-docs

#### result

Going to the SwaggerUI page.

## Some other Info

### log's

It has a folder with an error.log file for server logs.

## .env file

you should rename .env.example to .env and complete it.
It needs two mongoDB atlas URLs or local URLs, one for production data and one for testing.
You should put your secret for the JSON web token too.

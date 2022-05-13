# tinyUrl
Node URL Shortener API

## Used Tools

Shortid for generating code for URL's
Winston Logger
Swagger and Document is available
Jest and Supertest for End to end testing.
bcryptjs for hashing the password for more security.
mongodb for storing user and url's.

## How run it?

### preinstall

for installing all dependencies open terminal in that directory run :
npm install

### run it
open terminal in that directory and run:
npm start

## TEST

open terminal in that directory and run:
npm test

## End points

### USER SIGNUP

POST /api/auth/signup

#### parameters

{
    "email": "a valid email address",
    "password": "a strong valid password",
}
 #### result

{
    "message": "user successfully created now you can login with it!",
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

### GET USER URL's

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

### RIDIRECT TO ORIGINAL URL

GET /:code

#### result

Ridirect to original URL.

### SwaggerUI

GET /api-docs

#### result

Going to SwaggerUI page.

## some other Info

### log's

It have a folder with error.log file for sever logs.

## .env file

you shoud rename .env.example to .env and complete it.
It's need two mongoDB atlas url or local url, one for production data and one for testing.
You should put your secret for json web token too.

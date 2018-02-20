Getting Started
  - Create new directory by typing "mkdir <name of directory>"
  -Incorporate the new directory into your file system by typing "cd <name of directory>"
  - Create the database in roo land by going to the terminal and typing "roo db add <Name of your database>". This will generate  key, secret and URL.
  - In the terminal create a .gitignore file by typing 'echo ".env" > .gitignore'.
  - Start up atom in the terminal by typing "atom .". Make sure you have the following 2 items within the .gitignore file         and that is .env and node_modules. This is to avoid synchronization.

  -Create an environment file witht the basics for roo land. At the top you want to use the database URL so type COUCHDB_URL with the following format: "COUCHDB_URL=https://key:secret@url". This is how you gain access to the database in roo land.

  -Create a PORT benethe the COUCHDB_URL and make it equivalent to 4000. This should look like this PORT=4000.
  -We will need a package.json file, so type in the terminal "npm init -y". Then in order to bring the environment variables into your code type in the terminal "npm install dotenv". These two commands must be typed in that order. With the installation of  npm install dotenv, we get the dotenv library as well as all of its dependencies.

 - Other dependencies to install include, "body-parser", "express", "pouchdb", ramda", and slugify". These can all be done simultaneously.

 - Once installed create a load-data.js file and require in the following dependencies:
    "require('dotenv').config()""
    "const PouchDB = require('pouchdb')"

 - Create an api.js file and require in the following dependencies:
    require('dotenv').config()
    const express = require('express')
    const app = express()
    const port = process.env.PORT || 4000
    const HTTPError = require('node-http-error')
    const bodyParser = require('body-parser')
    const { prop } = require('ramda')

  - Create a dal.js file and require in the following dependencies:
    const PouchDB = require('pouchdb')
    const db = new PouchDB(process.env.COUCHDB_URL)
    const { pluck } = require('ramda')
    const slugify = require('slugify')

    - In order for us to see the database in the console and browser, go to you package.json file and under scripts type the following:   "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "load": "node load-data",
        "start": "node api.js"
      }
      The "load" script loads all the data from atom into the database and the "start" script allows you to type in the terminal "npm start" in order to see your data in the browser.


    - In order to make your first call within the browser to make sure that everything is working, you can test it by typing this into the api.js underneath what you have required in:

    app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API.')
})



BASICS


Base URL - http://localhost:4000/paintings/

SCHEME - This paintings API communicates over HTTP.

HTTP verbs includes: GET - Used to retrieve resources.
                     POST - Used to create resources.
                     DELETE -	Used to delete resources.
                     PUT - Used to update resources


Content Types: All endpoints within the ART API accept and return data formatted as JSON. The Content-Type request header with a value of application/json is required when providing content on the body of a request.


Response Status Codes and Description:

Status code = 200 OK
Description - The request was successful, and you can read the results from the body and headers of the response. For operations that create new resources, you'll typically find the ID of the newly created resource in the response body. For simplicity, we don't distinguish between successful calls that create, update, or delete resources.

Status code = 400 Bad Request
Description - The request failed due to an error on your part, such as a syntax error or malformed content in the request body.

Status code = 404 Not Found
Description - The requested resource could not be found. You may be trying to access a record that does not exist, or you may have supplied an invalid URL.

Status code = 500 Internal Server Error
Description - An unexpected error has occurred on our side. You should never receive this response, but if you do please let us know and we'll fix it.

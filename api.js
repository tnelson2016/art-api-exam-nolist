require('dotenv').config()
const express = require('express')
const app = express()

const port = process.env.PORT || 4000

const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { listPaintings, getPaintings, addPaintings } = require('./dal')
//const { prop, path } = require('ramda')

app.use(bodyParser.json())

app.get('/paintings/', function(req, res, next) {
  listPaintings({
    include_docs: true
    //  startkey: 'paintings_',
    //endkey: 'paintings_\ufff0'
  })
    .then(paintings => res.send(paintings))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/paintings/:id', (req, res, next) =>
  getPaintings(req.params.id)
    .then(paintings => res.send(paintings))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

app.post('/paintings', function(req, res, next) {
  addPainting(prop('body', req))
    .then(addedPaintingResult =>
      res.status(201).send('added new painting', addedPaintingResult)
    )
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.use((err, req, res, next) => {
  console.log('api.js Error', err)
  res.status(err.status || 500).send(err)
})

app.listen(port || 4000, () =>
  console.log('api is listening on port', port || 4000)
)

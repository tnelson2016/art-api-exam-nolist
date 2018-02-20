require('dotenv').config()
const express = require('express')
const app = express()

const port = process.env.PORT || 4000

const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  listPaintings,
  getPaintings,
  addPaintings,
  updatePaintings,
  deletePaintings,
  listArtists,
  getArtists,
  addArtists,
  updateArtists,
  deleteArtists
} = require('./dal')
const { prop, find } = require('ramda')

app.use(bodyParser.json())

app.get('/paintings/', (req, res, next) => {
  listPaintings({
    limit: 2,
    include_docs: true,
    startkey: 'painting_',
    endkey: 'painting_\ufff0'
  })
    .then(paintings => res.send(paintings))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.get('/paintings/:id', (req, res, next) =>
  getPaintings(req.params.id)
    .then(paintings => res.send(paintings))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

app.post('/paintings', function(req, res, next) {
  addPaintings(prop('body', req))
    .then(addedPaintingResult =>
      res.status(201).send('added new painting', addedPaintingResult)
    )
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.put('/paintings/:id', (req, res, next) =>
  updatePaintings(req.body).then(updatedResult =>
    res
      .status(200)
      .send('updated painting', updatedResult)
      .catch(err => next(new HTTPError(err.status, err.message, err)))
  )
)

app.delete('/paintings/:id', (req, res, next) =>
  deletePaintings(req.params.id)
    .then(deletedResult => res.status(200).send(deletedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

////////////////////////////////////////////////////////////////////////

app.get('/artists/', (req, res, next) => {
  listArtists({
    limit: 3,
    include_docs: true,
    startkey: 'artist_',
    endkey: 'artist_\ufff0'
  })
    .then(artists => res.send(artists))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/artists/:id', (req, res, next) =>
  getArtists(req.params.id)
    .then(artists => res.send(artists))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

app.post('/artists', function(req, res, next) {
  addArtists(prop('body', req))
    .then(addedArtistResult =>
      res.status(201).send('added new artist', addedArtistResult)
    )
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.put('/artist/:id', (req, res, next) =>
  updateArtists(req.body).then(updatedResult =>
    res
      .status(200)
      .send('updated artist', updatedResult)
      .catch(err => next(new HTTPError(err.status, err.message, err)))
  )
)

app.delete('/artist/:id', (req, res, next) =>
  deleteArtists(req.params.id)
    .then(deletedResult => res.status(200).send(deletedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

app.use((err, req, res, next) => {
  console.log('api.js Error', err)
  res.status(err.status || 500).send(err)
})

app.listen(port || 4000, () =>
  console.log('api is listening on port', port || 4000)
)

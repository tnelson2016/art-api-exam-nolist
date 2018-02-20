const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL)
const { pluck } = require('ramda')
const slugify = require('slugify')

const listPaintings = option =>
  db.allDocs(option).then(response => pluck('doc', response.rows))

const getPaintings = id => db.get(id)

const addPaintings = doc => {
  doc._id = `painting_${slugster(doc.name, { lower: true })}`
  db.put(doc)
}

const updatePaintings = id => db.put(painting)

const deletePaintings = id => db.get(id).then(paintings => db.remove(painting))

///////////////////////////////////////////////////////////////////////////////////////////////////////
const listArtists = option =>
  db.allDocs(option).then(response => pluck('doc', response.rows))

const getArtists = id => db.get(id)

const addArtists = doc => {
  doc._id = `artist_${slugster(doc.name, { lower: true })}`
  db.put(doc)
}

const updateArtists = id => db.put(artist)

const deleteArtists = id => db.get(id).then(artists => db.remove(artist))

module.exports = {
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
}

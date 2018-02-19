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

module.exports = { listPaintings, getPaintings, addPaintings }

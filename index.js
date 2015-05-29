'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const port = process.env.port || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())


// -- API routes ---------------------------------------------------------------

app.get('/empleados', function(req, res) {
  let rs = fs.createReadStream( path.join(__dirname, 'db', 'empleados.json') )
  rs.pipe(res)
})

app.get('/empleados/:id', function(req, res) {
  let file = path.join(__dirname, 'db', req.params.id + '.json')
  let rs = fs.createReadStream(file)
  rs.pipe(res)
})

// -- App running --------------------------------------------------------------

app.listen(port, onListening)

function onListening () {
  console.log(`Server running on port ${port}`)
}

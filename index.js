'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Empleado = require('./models/empleado')

const port = process.env.port || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())


// -- API routes ---------------------------------------------------------------
app.get('/empleados', function(req, res) {
  console.log('/empleados')
  res.end()
})

app.get('/empleados/:id', function(req, res) {
  console.log('/empleados/' + req.params.id)
  res.end()
})

mongoose.connect('mongodb://localhost/empleados', onConnected);

function onConnected (err, res) {
  if (err) throw err

  console.log('Connected to Database')
  app.listen(port, onListening)
}


function onListening () {
  console.log(`Server running on port ${port}`)
}

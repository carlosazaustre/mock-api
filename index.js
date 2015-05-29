'use strict'

const course = require('course')
const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.port || 3000
const server = http.createServer()
const router = course()

// -- Events -------------------------------------------------------------------

server.on('listening', onListening)
server.on('request', onRequest)

// -- API routes and running ---------------------------------------------------

router.get('/empleados', getAll)
router.get('/empleados/:id', getEmpleado)

server.listen(port)

// -- Controllers --------------------------------------------------------------

function getAll (req, res) {
  let rs = fs.createReadStream( path.join(__dirname, 'db', 'empleados.json') )
  rs.pipe(res)
}

function getEmpleado (req, res) {
  let file = path.join(__dirname, 'db', this.id + '.json')
  let rs = fs.createReadStream(file)
  rs.pipe(res)
}

// -- Handlers -----------------------------------------------------------------

function onListening () {
  console.log(`Server running on port ${port}`)
}

function onRequest (req, res) {
  router(req, res, function(err) {
    if (err) return res.end(err.message)

    res.end('404')
  })
}

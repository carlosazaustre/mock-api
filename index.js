'use strict'

var course = require('course')
var st = require('st')
var http = require('http')
var fs = require('fs')
var path = require('path')

var port = process.env.port || 3000
var server = http.createServer()
var router = course()
var mount = st({
  path: path.join(__dirname, 'assets')
})

// -- Events -------------------------------------------------------------------

server.on('listening', onListening)
server.on('request', onRequest)

// -- API routes, static files and running ---------------------------------------------------

router.get('/empleados', getAll)
router.get('/empleados/:id', getEmpleado)
router.get('/asset/:file', getAsset)

server.listen(port)

// -- Controllers --------------------------------------------------------------

function getAll (req, res) {
  var rs = fs.createReadStream( path.join(__dirname, 'db', 'empleados.json') )
  rs.pipe(res)
}

function getEmpleado (req, res) {
  var file = path.join(__dirname, 'db', this.id + '.json')
  var rs = fs.createReadStream(file)
  rs.pipe(res)
}

function getAsset (req, res) {
  var file = path.join(__dirname, 'assets', this.file)
  var rs = fs.createReadStream(file)
  rs.pipe(res)
}

// -- Handlers -----------------------------------------------------------------

function onListening () {
  console.log("Server running on port: " + port)
}

function onRequest (req, res) {
  router(req, res, function(err) {
    if (err) return res.end(err.message)

    res.statusCode = 400
    res.end('404')
  })
}

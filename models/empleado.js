'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
  firstName   : String,
  lastName    : String,
  fullName    : String,
  managerId   : Number,
  managerName : String,
  reports     : Number,
  title       : String,
  department  : String,
  cellPhone   : String,
  email       : String,
  city        : String,
  pic         : String,
  twitterId   : String,
  blog        : String
})

const Empleado = mongoose.model('Emplado', empleadoSchema)

module.exports = Empleado;

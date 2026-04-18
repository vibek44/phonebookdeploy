const express=require('express')
const mongoose=require('mongoose')
const config=require('./utilities/config')
const logger=require('./utilities/logger')
const { unKnownEndPoint,errorHandler }=require('./utilities/middleware')
const { infoRouter,personsRouter } =require('./controller/UserPage')

const app=express()

const url =config.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url, { family:4 })
  .then(() => {
    console.log('connected')
  })
  .catch( () => {
    console.log('error conecting...')
  })
app.use(express.static('dist'))
app.use(express.json())
app.use(logger)


app.use('/api',[infoRouter,personsRouter])
app.use(unKnownEndPoint)
app.use(errorHandler)

module.exports=app
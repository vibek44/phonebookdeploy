const express=require('express')
const app=express()
const {infoRouter,personsRouter}=require('./controller/UserPage')
app.use(express.static('dist'))
app.use(express.json())
const { unKnownEndPoint,errorHandler }=require('./utilities/middleware')
const {logger}=require('./utilities/logger')

    
const PORT= process.env.PORT || 3001

app.use(logger())

app.use('/api',[infoRouter,personsRouter])
app.use(unKnownEndPoint)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
})



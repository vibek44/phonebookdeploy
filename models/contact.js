require('dotenv').config()
const mongoose=require('mongoose')


const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url, { family:4 })
   .then(()=>{
       console.log('connected')
   })
   .catch(error=>{
        console.log(`error coneecting : ${error.errmsg}`) 
   })

const contactSchema=new mongoose.Schema({
    name:{ 
       type:String,
       required:true,
       unique:true,
       minLength:5
    },
    number:{
       type:String,
       required:true,
       minLength:10
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  
   

module.exports=mongoose.model('Contact', contactSchema)
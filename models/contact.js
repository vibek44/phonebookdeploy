require('dotenv').config()
const mongoose=require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url, { family:4 })
   .then(()=>{
       console.log('connected')
   })
   .catch(error=>{
        console.log(`error conecting...`) 
   })

const contactSchema=new mongoose.Schema({
    name:{ 
       type:String,
       required:true,
       unique:true,
       minLength:[3,' length should be atleast three charactor long']
    },
    number:{
        type:String,
        required:true,
        minLength:[8, ' should be atleast eight digit long'],
        validate:{
            validator:function(v){
                return /\d{2,3}-\d{7,8}/.test(v) && v.split('-')[0].length<4 && v.split('-')[1].length<9
            },
            message:props=>`${props.value} is not a valid phone number`          
        }
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
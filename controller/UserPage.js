const personsRouter=require('express').Router()
const infoRouter=require('express').Router()
const Contact=require('../models/contact')

personsRouter.get('/persons',(req,res,next)=>{
    Contact.find({})
    .then(result=>res.json(result))
    .catch(error=>next(error))
})
 
personsRouter.get('/persons/:id',(req,res,next)=>{
    Contact.findById(req.params.id)
    .then(result=>{
        if(result){
            res.json(result)
        }
        else{
            res.status(204).end()
        } 
    })
    .catch(error=> next(error))    
})
 
 
personsRouter.post('/persons',(req,res,next)=>{
    let body=req.body
    body={name:body.name.trim(),number:body.number.trim()}
 
    if(!body.name || !body.number){
        return res.status(400).json({error:'name or number is missing'})
    }
     
    const contact=new Contact({...body})
    contact.save()
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(error=>next(error))  
})
 
personsRouter.delete('/persons/:id', (req,res,next)=>{
    Contact.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).end()
    })
    .catch(error=>{
        next(error)
    })
})
 
personsRouter.put('/persons/:id', (req, res,next)=>{
    const body=req.body
    Contact.findById(req.params.id)
    .then( result=>{
        if(!result){
            return res.status(404).end()
        }
        result.number=body.number
        result.save()
        .then(result=>{
           res.json(result) 
        })
        .catch(error=>next(error))
    })    
})


infoRouter.get('/info',(req,res)=>{
    Contact.find({})
    .then(result=>{
        res.send(`<p>phonebook has info for ${result.length} people</p> <p>${new Date()}</p>` )
    })
    
})


module.exports={infoRouter,
    personsRouter 
}
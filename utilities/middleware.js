const unKnownEndPoint=(req,res)=>{
    return res.status(404).send('unknown Endpoint : 404')
  }
  
  const errorHandler=(error,req,res,next)=>{ 
    if(error.name==='CastError'){
      return res.status(400).send({error:'malformated id'})
    }else if(error.name==='ValidationError'){
      return res.status(400).json({error:error.message}) 
    }
   
    next(error)
  }
  
  module.exports={unKnownEndPoint,errorHandler}
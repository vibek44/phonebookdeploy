const morgan=require('morgan')


morgan.token('content',(req,res)=>{
    if(req.method==='POST') return JSON.stringify (req.body)
   else return 'Request is not post'
})
 
module.exports=morgan( ':method  :url :status :res[content-length] - :response-time ms :content')
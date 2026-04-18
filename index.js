const config=require('./utilities/config')
const app=require('./app')

const PORT=config.PORT

app.listen(PORT,() => {
  console.log(`server running on port : ${PORT}`)
})



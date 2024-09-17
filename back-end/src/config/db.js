const mongoose=require('mongoose')

const dbConnection= async()=>{
    try{
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log('database connected successfully')
    }
    catch(err){
        console.log(err)
    }
}

module.exports=dbConnection
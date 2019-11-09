const mongoose=require('mongoose')
const config=require('config')
const db=config.get('mongoURI') //config contains global variables

const connectDB=async()=>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
             useUnifiedTopology: true  },
            );
        console.log('mongoDB connected...')
    }catch(e){
        console.log(e.message)

        //exit process with faliure
        process.exit(1)
    }
}
module.exports=connectDB;
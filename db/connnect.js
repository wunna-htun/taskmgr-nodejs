const mongose=require('mongoose')

const connectDb=(url)=>{

    console.log("url stream",url)
    return mongose.connect(url)

}
// mongose.connect(connectionString).then(()=> console.log('connected to db ...')).catch((err)=>console.log(err))


module.exports=connectDb
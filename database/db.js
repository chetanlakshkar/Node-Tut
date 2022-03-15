const mongoose=require('mongoose')
const DB="mongodb+srv://chetan:chetan@cluster0.muxus.mongodb.net/Node-Tut?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    UseUnifiedTopology:true,

}).then(()=>{
    console.log("connection successful");

}).catch((err)=>{
    console.log("connection failed")
})
const express=require('express');
const app=express();
app.use(express.json());
require("./database/db.js")
app.use(require("./router/route.js"));
app.get("/",(req,res)=>{
res.send("this is home page");
});
app.listen(5000);
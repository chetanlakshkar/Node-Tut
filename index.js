const dotenv = require("dotenv");
const express=require('express');
const app=express();
dotenv.config({ path: "./config.env" });
app.use(express.json());
require("./database/db.js")
const PORT = process.env.PORT;
app.use(require("./router/route.js"));
app.get("/",(req,res)=>{
res.send("this is home page");
});
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
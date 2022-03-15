const express = require("express");
const router = express.Router();
require("../database/db.js")
const User = require("../model/userSchema");

router.get("/about", (req, res) => {
    res.send("hello this is about");
  });
  
// router.post("/register", (req, res) => {
//     console.log(req.body);
// console.log(req.body.name);
//     res.json({message:req.body});
//   });


  router.post("/register",async (req, res) => {
    try {
      let { name, email, phone, work, password, cpassword} = req.body;
      let data = new User({
        name, email, phone, work, password, cpassword
      });
      let Register = await data.save();
      if (Register) {
        res.json({
          status: 200,
          success: true, 
          message: "User Data Saved Successfully",
          data: Register,
        });
      } else {
        res.json({
          status: 400,
          success: false,
          message: "Something Went Wrong",
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        success: false,
        message: error.message,
      });
    }
})


router.post("/getuser",async (req, res) => {
    try {
      let {name} = req.body;
  
      let getUser = await User.findOne({ name: name });
  
      if (getUser) {
        res.json({
          status: 200,
          success: true,
          message: "User Data ",
          data: getUser,
        });
      } else {
        res.json({
          status: 400,
          success: false,
          message: "Something Went Wrong",
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        success: false,
        message: error.message,
      });
    }
  })

  router.post("/login",async (req, res) => {
    try {
      let {email,password} = req.body;
  
      let login = await User.findOne({ email:email,password:password });
  
      if (login) {
        res.json({
          status: 200,
          success: true,
          message: "login sccessfull ",
          data:login,
        });
      } else {
        res.json({
          status: 400,
          success: false,
          message: "login unsccessful",
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        success: false,
        message: error.message,
      });
    }
  })
 

  router.post('/update',async(req,res)=>{
      try{
          let {name,email,phone,work,password,cpassword}=req.body;

          let update =await User.findOneAndUpdate({})

      } catch (error){
        res.json({
            status: 400,
            success: false,
            message: error.message,
          });
      }
  })




        module.exports = router;
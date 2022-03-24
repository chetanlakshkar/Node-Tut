const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const params = require("params");
const jwt = require("jsonwebtoken");
const json =require("../jwt")


require("../database/db.js");
const User = require("../model/userSchema");

router.get("/about", (req, res) => {
  res.send("hello this is about");
});

// router.post("/register", (req, res) => {
//     console.log(req.body);
// console.log(req.body.name);
//     res.json({message:req.body});
//   });

router.post("/register", async (req, res) => {
  let { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the data" });
  } else if (password !== cpassword) {
    return res.status(422).json({ error: "password dont match" });
  }
  try {
    let data = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });
    let Register = await data.save();
    if (Register) {
      res.status(200).json({
        success: true,
        message: "User Data Saved Successfully",
        data: Register,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something Went Wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/getuser", async (req, res) => {
  let { name } = req.body;
  try {
    let getUser = await User.findOne({ name: name });

    if (getUser) {
      res.status(200).json({
        success: true,
        message: "User get Data ",
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
});

router.post("/login", async (req, res) => {
  try {
    let token;
    let { email, password } = req.body;

    let login = await User.findOne({ email: email });
    if (login) {
      const IsMatch = await bcrypt.compare(password, login.password);
      //  token = await login.generateAuthToken();
      //   console.log(token)

      if (IsMatch) {
        res.json({
          status: 200,
          success: true,
          message: "login sccessfull ",
          data: login,
        });
      } else {
        res.json({
          status: 400,
          success: false,
          message: "login unsccessful",
        });
      }
    }
  } catch (error) {
    res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
});

router.put("/update/:id",json.auth, async (req, res) => {
  try {
    const token= req.headers.authorization;
    let { name, email, phone, work, password, cpassword } = req.body;
    console.log(token,"token");
    

    let data = await User.findOneAndUpdate(
      { token: token },
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          work: work,
          password: password,
          cpassword: cpassword,
        },
      }
    );
    if (data) {
      res.json({
        status: 200,
        success: true,
        message: "User Data Updated Successfully",
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
});


router.post("/delete",async(req,res)=>{
  try{

  }
  
    catch (error) {
      res.json({
        status: 400,
        success: false,
        message: error.message,
      });
  }
})


module.exports = router;

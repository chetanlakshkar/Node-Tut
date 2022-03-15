const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

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
    let getUser = await User.save().findOne({ name: name });

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
    let { email} = req.body;

    let login = await User.findOne({ email: email });
   
    if (login) {
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
  } catch (error) {
    res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
});


router.put("/updateUser", async(req, res)=>{
  try {
    let  id = req.params.id
    console.log(id,"id");
    let { name,email } = req.body;

    let Data = await User
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            email:email
          },
        }
      )
      if(Data) {
        res.status(200).json({
          success: true,
          message: "User Data Updated Successfully",
        });
      }
    else {
        res.status(400).json({
          success: false,
          message: "Something Went Wrong",
        });
      };
  } catch (error) {
    res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
})

module.exports = router;

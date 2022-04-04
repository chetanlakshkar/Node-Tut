const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const params = require("params");
const jwt = require("jsonwebtoken");
const json = require("../jwt");
let { mail } = require('../nodemailer/test')
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
    var otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    let data = new User({
      name,
      email,
      phone,
      work,
      code: otp,
      password,
      cpassword,
    });
    let Register = await data.save();
    let sendMail = await mail(email, otp)
    console.log(data, "data");
    if (Register) {
      res.status(200).json({
        success: true,
        message: "User registered Successfully",
        data: data,
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
  let { id } = req.params;
  try {

    let getUser = await User.findOne({ id });

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
    let { email, password, code } = req.body;
    const logincode = await User.findOne({ code: code });
    if (logincode) {

      let login = await User.findOne({ email: email });
      if (login) {

        const IsMatch = await bcrypt.compare(password, login.password);

        if (IsMatch) {
          let payload = {
            id: login._id,
            email: login.email,
          };
          let token = await json.generateAuthToken(payload);
          console.log(token, "token");
          res.json({
            status: 200,
            success: true,
            message: "login sccessfull ",
            data: token,
            // data:login
          });
        } else {
          res.json({
            status: 400,
            success: false,
            message: "login unsccessful",
          });
        }
      } else {
        res.json({
          status: 400,
          success: false,
          message: "email not matched ",
        });
      }

    }

    else {
      res.json({
        status: 400,
        success: false,
        message: "code not matched ",
      });
    }
  }
  catch (error) {
    res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
});

router.put("/update/:id", json.auth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    let { name, email, phone, work, password, cpassword } = req.body;
    console.log(token, "token");

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
    let updatedata = await data.save();
    if (updatedata) {
      res.json({
        status: 200,
        success: true,
        message: "User Data Updated Successfully",
        //data:token,
        data: data
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

router.delete("/delete/:id", json.auth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    // let { name, email, phone, work, password, cpassword } = req.body;
    console.log(token, "token");

    let data = await User.findOneAndDelete({ token: token });
    let deletedata = data.save();
    if (deletedata) {
      res.json({
        status: 200,
        success: true,
        message: "User Data deleted Successfully",
        data: token,
        // data:deletedata
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

router.post("/verifyCode", async (req, res) => {
  try {
    let {
      email,
      code,
    } = req.body

    let checkUser = await User.findOne({
      email
    })
    if (checkUser) {
      console.log(checkUser.is_verified == true)

      if (checkUser.is_verified == false) {

        if (checkUser.code == code) {
          let updateOtp = await User.updateOne({
            email: email
          }, {
            $set: {
              is_verified: 1,
              code: 0
            }
          });
          res.json({
            status: true,
            statusCode: 200,
            message: "Otp Verified Successfully",
            data: updateOtp
          })
        } else {
          res.json({
            status: false,
            statusCode: 200,
            message: "You Entered a Wrong Otp .",
            data: ""
          })
        }
      } else {
        res.json({
          status: false,
          statusCode: 200,
          message: "Your Account Is Already Verified",
          data: ""
        })
      }

    } else {
      res.json({
        status: false,
        statusCode: 200,
        message: "This User Is Not Exits",
        data: ""
      })
    }
  } catch (error) {
    res.json({
      status: false,
      statusCode: 400,
      message: error.message,
      data: ""
    })
  }
})

module.exports = router;

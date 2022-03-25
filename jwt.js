const jwt = require("jsonwebtoken");


// const json = {
//   generateAuthToken: async () => {
//     try {
//       let payload = {    
//               id : this.id, 
//               email : this.email  
//               };
//               console.log(payload)
//               const options = {
//               expiresIn: '365d'
//               };
//       let token = jwt.sign( payload,process.env.SECRET_KEY,options);
//       this.tokens = this.tokens.concat({ token: token });
//       await this.save();
//       return token;
//     } catch (err) {
//       console.log(err);
//     }
//   },

//   auth: async (req, res, next) => {
//     const token = req.headers.authorization;
//     const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
//     console.log(verifyuser);

//     if (verifyuser) {
//       return next();
//     }
//   },
// };


const json = {
  //create token
  generateAuthToken: async user => {
  //    console.log("user console",user)
      let payload = {    
      id : user.id, 
      email : user.email  
      };
      const options = {
      expiresIn: '365d'
      };
      const jwtToken = await jwt.sign(payload, 'KEy', options)
      return jwtToken;
  },
  //verify Token 
  auth: async (req, res, next) => {
    var token=req.headers.authorization                     
      await jwt.verify(token, 'KEy', function(err, decoded)
      {                     
          if (err) {                    
              return res.json({
                  status:400,
                  success: false,
                  message: "Token not found",
              });
          }   else {                            
              req.user = {
                  id: decoded.id,  
                  email: decoded.email,               
              }
              return next();
          }
      });
  }
};
module.exports = json;

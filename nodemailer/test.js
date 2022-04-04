const nodemailer=require('nodemailer');

 module.exports.mail =async (email,otp) => {
    const transport = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'lakshkarchetan8@gmail.com',
        pass: "c1h2e3t4a5n6"
  
      }
    });
    const mailOptions = {
      from: "lakshkarchetan8@gmail.com",
      to: email,
      subject: "verification code ",
      html: `<h1>your verification code is '${otp}'</h1>`
    }
  
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('email send', +res.response);
      }
    });
  }

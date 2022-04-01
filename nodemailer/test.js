const nodemailer=require('nodemailer');

const mail = () => {
    const transport = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'lakshkarchetan8@gmail.com',
        pass: "c1h2e3t4a5n6"
  
      }
    });
    const mailOptions = {
      from: "lakshkarchetan8@gmail.com",
      to: "chetanlakshakar@gmail.com",
      subject: "Sending Email Using Node.js",
      html: '<h1>Welcome</h1><p>That was easy!</p>'
    }
  
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('email send', +res.response);
      }
    });
  }
  mail();
const jwt = require("jsonwebtoken");

const json = {
  generateAuthToken: async () => {
    try {
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({ token: token });
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  },

  auth: async (req, res, next) => {
    const token = req.headers.authorization;
    const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyuser);

    if (verifyuser) {
      return next();
    }
  },
};
module.exports = json;

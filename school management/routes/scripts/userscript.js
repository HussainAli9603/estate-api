// let User = require("../../models/user");
// let Favourite = require("../../models/favourite");
// let Vehicle = require("../../models/Vehicle");
// let City = require('../../models/city');
// let bcrypt = require("bcryptjs");
// let jwt = require('jsonwebtoken');
// let jwtConfig = require('../../config/jwtConfig');
// let nodemailer = require('nodemailer');
// let api_key = '9b7587990e46d7d45b905282596f3162-77751bfc-d0ba1c81';
// let domain = 'sandbox05a3da0b94bb421caa02db795b3536dc.mailgun.org';
// let mailgun = require('mailgun-js')({apiKey:api_key,domain:domain});

let options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const saltRounds = 10;
module.exports = {
  Home: async function (req, res) {
    res.render("login/index")
  },

  


}

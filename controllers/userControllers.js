const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const nodemailer = require("nodemailer");

const sendEmail = async (newUser) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5223c537c5492f",
        pass: "71024214e85462",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Treasure Hunt Team 👻" ${testAccount.user}`, // sender address
      to: `${newUser.email}`, // list of receivers
      subject: "Welcome to Treasure Hunt 🏴‍☠️", // Subject line
      text: `Hello ${newUser.username}, 
      Welcome to Treasure Hunt Website.
      
      Regards,
      Treasure Hunt Team ❤`, // plain text body
    });
    console.log("email ::::::", info);
  } catch (error) {
    console.log("Sending Email Error::", error);
  }
};

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    sendEmail(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

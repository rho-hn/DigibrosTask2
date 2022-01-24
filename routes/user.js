const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const auth=require('../middleware/auth')



router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                msg: "error while signing up",
              error: err
           })
        }
   const user = new User({
  _id: new mongoose.Types.ObjectId,
 username: req.body.username,
   password: hash,
 phone: req.body.phone,
  email: req.body.email,
  userType: req.body.userType

        })


        user.save().then(result => {
            console.log(result);
            res.status(200).json({
                msg: "User registered successfully",
                newUser: result
            })
        })
        .catch(err => {
         console.log(err);
          res.status(500).json({
          msg: "Error while signing up",
          error: err
                })
            })
    })
})

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
   .then(user => {
      if (user.length < 1) {
     return res.status(401).json({
   msg: 'user not exists'
   })
    }
  bcrypt.compare(req.body.password, user[0].password, (err, result) => {
    if (!result) {
 return res.status(401).json({
     msg: 'incorrect password'
            })
       }
      if (result) {
        const token = jwt.sign({
         username: user[0].username,
        userType: user[0].userType,
        email: user[0].email,
         phone: user[0].phone
           },
      'my_secret_key',
         {
          expiresIn: "24h"
           }
          );
 return res
    .cookie("access_token", token, {
      httpOnly: true,
     secure: process.env.NODE_ENV === "production",
          })
       .status(200)
    .json({
 msg: "login successful",
   username: user[0].username,
   userType: user[0].userType,
    email: user[0].email,
   phone: user[0].phone,
    token: token
     })}})})
  .catch(err => {
  console.log(err);
  res.status(500).json({
  msg: "Login unsuccessful",
  error: err
  })})})

router.get("/protected", auth, (req, res) => {
    return res.json({ username: req.body.username,
         });});
router.get("/logout", auth, (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out" });
  });



module.exports = router;


const cloudinary = require('cloudinary')
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});
const userModel = require("../Models/user.model");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const userWelcome = (req,res)=>{
   res.send('Welcome User')
}
const userSignUp = (req,res)=>{
   // console.log(req.body);
   console.log("user registered");
   let user = new userModel(req.body)
   user.save()
   .then((response)=>{
      console.log(response)
      console.log("User Created");
      res.send({status: true, message: 'User Saved Succesfully'})
   }).catch((err) => {
      console.log(err);
      if (err.code==11000) {
         res.send({status: false, message: 'Email already exist!'})
      }else{
         res.send({status: false, message: 'User Not Saved!'})
      }
   });

}

const userSignIn = (req,res)=>{
   console.log(req.body);
   const {email,password} = req.body
   userModel.findOne({email: email}) 
   .then((result) => {
      if (result) {
         // console.log(result);
         bcryptjs.compare(req.body.password, result.password, (err, response) => {
            if (response) {
               console.log(response);
               const token = jwt.sign({email}, SECRET, {expiresIn: "3h"})
               console.log(token);
               res.send({ status: true, message: 'Login Successfully', token });
            }
           else {
            console.log(err);
                res.send({ status: false, message: 'Incorrect Password' });
            }
        });
         
      }else{
         res.send({status: false, message: 'Incorrect email or password'}) 
      }
   }).catch((err) => {
      console.log(err);
   });  
}

const getDashboard = (req,res)=>{
//   console.log(req.headers.authorization.split(" ")[1]);
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
         console.log(err);
         res.send({status: false, message: 'Invalid Token'})
      }
      else {
         console.log(decoded);
         res.send({status: true, message: 'Valid Token'})
         
      }
  })
}
const uploadFile=(req,res)=>{
   // console.log(req.body.file);
   // res.send(req.file);
   cloudinary.v2.uploader.upload(req.body.file,(err, result)=>{
      if (err) {
         console.log(err);
      } else{
         // console.log(result);
         let myImage = result.secure_url
         res.send({status: true, message: 'File Uploaded Successfully', myImage})
      }
   });
}
module.exports = {userWelcome,userSignUp,userSignIn,getDashboard,uploadFile}

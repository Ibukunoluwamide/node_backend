const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    password: String,
})
let saltRound = 10
userSchema.pre("save", function(next) {
    bcryptjs.hash(this.password,saltRound,(err,hash)=>{
        //   console.log(this.password);
          if (err) {
            console.log(err);
          }else{
            //   console.log(hash);
              this.password = hash
              next()
          }
    })
})
let userModel = mongoose.model('users', userSchema)

module.exports = userModel
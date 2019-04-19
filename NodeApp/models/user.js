const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    unique:true,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator);
const User = module.exports = mongoose.model('User', userSchema);

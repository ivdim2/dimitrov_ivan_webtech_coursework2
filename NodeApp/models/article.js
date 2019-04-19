let mongoose = require('mongoose');

//Article Schema
let articleSchema = mongoose.Schema({
  MessageTittle:{
    type:String,
    required: true
  },
  MessageFrom:{
    type:String,
    required: true
  },
  Message:{
    type:String,
    required: true
}
});

let Article = module.exports = mongoose.model('Article', articleSchema);

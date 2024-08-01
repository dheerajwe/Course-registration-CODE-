const { request } = require("express");
const mongoose=require("mongoose");

const data=mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please enter ur name"],

  },
  id:{
    type:Number,
    required:true,
    default:0
  },
  course:{
    type:String,
    required:true,
    default:"Python"
  },
  mail:{
    type:String,
    required:true,
  },
  mobile:{
    type : Number,
    required :true
  }
},
{
  timestamps:true,

}

)
const form=mongoose.model("form",data);

module.exports=form;
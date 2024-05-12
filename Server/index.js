const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
const User = require('./model/user')
const bcrypt = require('bcrypt')

require("dotenv").config();
const app = express();
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
    return res.status(200).send("Pearl")
})

app.post('/login', async(req,res) => {
  const body = req?.body;
  if(!body.email || !body.password){
    return res.status(400).json({
      status: false,
      error:{
        message:"Email and Password Are required"
      }
    })
  }

  const{email, password} = req.body;

  const user = await User.findOne({email})
  const passwordMatch = await bcrypt.compare(password, user.password)

  if(!passwordMatch){
    return res.status(200).json({
      status: false,
      error:{
        message: "Invalid Login Cridential"
      }
    })
  }

  return res.status(200).json({
    status: true,
    data:{
      user
    }
  })
})

app.post('/create', async(req,res) => {
    const body = req?.body;
    if(!body.fullname || !body.email || !body.password){
      return res.status(400).json({
        status: false,
        error:{
          message:"Full name, Email and Password are required",
        }
      })
    }

    const{email, fullname, password} = req.body;
    try{
    const userExist = await User.findOne({
      email
    })
    if(userExist){
      return res.status(200).json({
        status:false,
        error:{
          message:"User already Exist"
        }
      })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({email, fullname, password: hashPassword})

    return res.status(201).json({
      status:true,
      data:{
        email, fullname
      }
    });
  }catch(error){
    console.error(error)
  }
})


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected");
  app.listen(1602, () => {
    console.log("Listening on port 1602");
  });
});

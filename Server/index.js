const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
const User = require('./model/user')
const Record = require('./model/userrecord')
const Appointment = require('./model/appointment')
const bcrypt = require('bcrypt')

require("dotenv").config();
const app = express();
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
    return res.status(200).send("Pearl")
})

// app.post('/appoinment', (req,res) => {
//   const body = req?.body;
//   if(!body.symptoms || !body.dateandtime){
//     return res.status(400).json({
//       status:false,
//       error:{
//         message:"Appointment date "
//       }
//     })
//   }
// })

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
    const role = req.body?.isAdmin ? "doctor" : "user"
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

    await User.create({email, fullname, password: hashPassword,role})

    return res.status(201).json({
      status:true,
      data:{
        email, fullname, role
      }
    });
  }catch(error){
    console.error(error)
  }
})

// app.post('/appointment', async(req,res) =>{
//   const body = req?.body;
  
// })

app.post('/getrecord', async(req,res) => {
  const body = req?.body;

  if(!body.userid){
    return res.status(400).json({
      status: false,
      error:{
        message:"No userID"
      }
    })
  }

  const{firstname, lastname, dateofbirth, gender, address, phonenumber, bloodgroup, genotype, nationality, lga, religion, allergies, userid} = req.body;

  try {
    const recordExist = await Record.findOne({ userid }).exec();
    if(!recordExist){
      return res.status(404).json({
        status: false,
        error:{
          message:"user record does not exist"
        }
      })
    }
  
    return res.status(200).json({
      status:true,
      data:{
        recordExist
      }
    }) 
  } catch (error) {
    console.error(error)
  }
})

app.get('/getusers', async(req, res) => {
  const body = req?.body;
  try {
    const users = await User.find({role: "user"})
    return res.status(200).json({
      status:true,
      data:{
        users
      }
    })
  } catch (error) {
    console.error(error)
  }
})

app.post('/record', async(req,res) => {
  const body = req?.body;
  if(!body.firstname || !body.lastname || !body.dateofbirth || !body.gender || !body.address || !body.phonenumber || !body.bloodgroup || !body.genotype || !body.nationality || !body.lga || !body.religion || !body.allergies || !body.userid){
    return res.status(400).json({
      status: false,
      error:{
        message:"Firstname, lastname, dateofbirth, gender, address, phonenumber, bloodgroup, genotype, nationality, lga, religion, allergy and userid are required"
      }
    })
  }

  const{firstname, lastname, dateofbirth, gender, address, phonenumber, bloodgroup, genotype, nationality, lga, religion, allergies, userid} = req.body;
  try {
    // const recordExist = await Record.findOne({
    //   firstname, lastname, dateofbirth
    // })
    // if(recordExist){
    //   return res.status(200).json({
    //     status:false,
    //     error:{
    //       message:"User already Exist"
    //     }
    //   })
    // }

  await Record.create({firstname, lastname, dateofbirth, gender, address, phonenumber, bloodgroup, genotype, nationality, lga, religion, allergies, userid})

  return res.status(201).json({
    status: true,
    data:{
      message: 'Record saved'
    }
  })

  } catch (error) {
    console.error(error)
  }
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected");
  app.listen(1602, () => {
    console.log("Listening on port 1602");
  });
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./model/user");
const Record = require("./model/userrecord");
const Appointment = require("./model/appointment");
const bcrypt = require("bcrypt");
const Chat = require("./model/chats");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat-rcvd", (msg) => {
    console.log(msg);
  });
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).send("Pearl");
});

app.post("/appoinment", async (req, res) => {
  const body = req?.body;
  if (
    !body.symptoms ??
    !body.dateandtime ??
    !body.approved ??
    !body.doctor ??
    !body.userid ??
    !body.prediction
  ) {
    return res.status(400).json({
      status: false,
      error: {
        message:
          "symptoms, dateandtime, prediction, approved, doctor and userid is required ",
      },
    });
  }

  const { symptoms, dateandtime, prediction, approved, doctor, userid } =
    req.body;
  try {
    await Appointment.create({
      symptoms,
      dateandtime,
      prediction,
      approved,
      doctor,
      userid,
    });

    return res.status(201).json({
      status: true,
      data: {
        symptoms,
        dateandtime,
        prediction,
        approved,
        doctor,
        userid,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/getappointments", async (req, res) => {
  const body = req?.body;
  try {
    const appointments = await Appointment.find();
    return res.status(200).json({
      status: true,
      data: {
        appointments,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  const body = req?.body;
  if (!body.email || !body.password) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Email and Password Are required",
      },
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(200).json({
      status: false,
      error: {
        message: "Invalid Login Cridential",
      },
    });
  }

  return res.status(200).json({
    status: true,
    data: {
      user,
    },
  });
});

app.post("/create", async (req, res) => {
  const body = req?.body;
  if (!body.fullname || !body.email || !body.password) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Full name, Email and Password are required",
      },
    });
  }

  const { email, fullname, password } = req.body;
  try {
    const role = req.body?.isAdmin ? "doctor" : "user";
    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      return res.status(200).json({
        status: false,
        error: {
          message: "User already Exist",
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ email, fullname, password: hashPassword, role });

    return res.status(201).json({
      status: true,
      data: {
        email,
        fullname,
        role,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/getuserrecord", async (req, res) => {
  const body = req?.body;
  const { userid } = req.body;
  try {
    const records = await Record.findOne({ userid }).exec();
    return res.status(200).json({
      status: true,
      data: {
        records,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/getrecord", async (req, res) => {
  const body = req?.body;

  if (!body.userid) {
    return res.status(400).json({
      status: false,
      error: {
        message: "No userID",
      },
    });
  }

  const {
    firstname,
    lastname,
    dateofbirth,
    gender,
    address,
    phonenumber,
    bloodgroup,
    genotype,
    nationality,
    lga,
    religion,
    allergies,
    userid,
  } = req.body;

  try {
    const recordExist = await Record.findOne({ userid }).exec();
    if (!recordExist) {
      return res.status(404).json({
        status: false,
        error: {
          message: "user record does not exist",
        },
      });
    }

    return res.status(200).json({
      status: true,
      data: {
        recordExist,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/getusers", async (req, res) => {
  const body = req?.body;
  try {
    const users = await User.find({ role: "user" });
    return res.status(200).json({
      status: true,
      data: {
        users,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/getdoctors", async (req, res) => {
  const body = req?.body;
  try {
    const users = await User.find({ role: "doctor" });
    return res.status(200).json({
      status: true,
      data: {
        users,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/record", async (req, res) => {
  const body = req?.body;
  if (
    !body.firstname ||
    !body.lastname ||
    !body.dateofbirth ||
    !body.gender ||
    !body.address ||
    !body.phonenumber ||
    !body.bloodgroup ||
    !body.genotype ||
    !body.nationality ||
    !body.lga ||
    !body.religion ||
    !body.allergies ||
    !body.userid
  ) {
    return res.status(400).json({
      status: false,
      error: {
        message:
          "Firstname, lastname, dateofbirth, gender, address, phonenumber, bloodgroup, genotype, nationality, lga, religion, allergy and userid are required",
      },
    });
  }

  const {
    firstname,
    lastname,
    dateofbirth,
    gender,
    address,
    phonenumber,
    bloodgroup,
    genotype,
    nationality,
    lga,
    religion,
    allergies,
    userid,
  } = req.body;
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

    await Record.create({
      firstname,
      lastname,
      dateofbirth,
      gender,
      address,
      phonenumber,
      bloodgroup,
      genotype,
      nationality,
      lga,
      religion,
      allergies,
      userid,
    });

    return res.status(201).json({
      status: true,
      data: {
        message: "Record saved",
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/sendmessage", async (req, res) => {
  const { senderId, recipientId, messageText } = req.body;

  if (!senderId || !recipientId || !messageText) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Ids and message are required",
      },
    });
  }

  try {
    await Chat.create({ senderId, recipientId, messageText });

    return res.status(200).json({
      status: true,
      data: {
        message: "Chat sent succesfully",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Error encountered",
      },
    });
  }
});

app.post("/getmessages", async (req, res) => {
  const { senderId, recipientId } = req.body;

  if (!senderId || !recipientId) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Ids are required",
      },
    });
  }

  try {
    const messages = await Chat.find({
      senderId: { $in: [senderId, recipientId] },
      recipientId: { $in: [senderId, recipientId] },
    })
      .sort({ createdAt: 1 })
      .exec();

    return res.status(200).json({
      status: true,
      data: {
        messages,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: false,
      error: {
        message: "Error encountered",
      },
    });
  }
});

app.post("/appointment/approve", async (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId)
    return res.status(400).json({
      status: false,
      error: {
        message: "Appointmet id required",
      },
    });
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      { approved: true }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Error encountered",
      },
    });
  }
  return res.status(200).json({
    status: true,
    data: {
      message: "appointment approved",
    },
  });
});

app.post("/appointment/reject", async (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId)
    return res.status(400).json({
      status: false,
      error: {
        message: "Appointment id required",
      },
    });

  const appointment = await Appointment.findOneAndUpdate(
    { _id: appointmentId },
    { approved: false }
  );

  return res.status(200).json({
    status: true,
    data: {
      message: "appointment rejected",
    },
  });
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected");
  app.listen(1602, () => {
    console.log("Listening on port 1602");
  });
});

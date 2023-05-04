// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require('multer');
// const csv = require('csv-parser');
// const fs = require('fs');
// const router = express.Router();
// const MongoClient = require('mongodb').MongoClient;

// const upload = multer({ dest: 'uploads/' });


// const JWT_SECRET =
//   "argsbdthbsw236w7r8g@1e*hfvh";


// // const mongoUrl = "mongodb+srv://webapigroupcw:WebCw2023@holidaycentral.lraqbqq.mongodb.net/holidayCentralDb?retryWrites=true&w=majority";
// const mongoUrl = "mongodb+srv://lakna:lakna123@cluster0.0e3f0ld.mongodb.net/holidayCentralDb?retryWrites=true&w=majority"

// mongoose.connect(mongoUrl,{
//     useNewUrlParser:true
// }).then(()=>{console.log("CONNECTED TO DATABASE");})
// .catch((e)=> console.log(e));

// require("./userDetails");
// const User = mongoose.model("UserInfo");

// // Register 
// app.post("/register",async(req,res)=>{
//     const{slct_permission,fname,lname,email,password}= req.body;
//     const encryptedPassword = await bcrypt.hash(password,10);
//     try{
//         const oldUser = await User.findOne({email});
//         if(oldUser){
//            return res.send({status: "User Exists"});
//         }
//        await User.create({
//         slct_permission,
//         fname,
//         lname,
//         email,
//         password: encryptedPassword,
//        });
//        res.send({status: "ok"});
//     }catch(error){
//         res.send({status: "error"});
//     }
// });

// // Login 
// app.post("/login-user", async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ error: "User Not found" });
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({}, JWT_SECRET, {
//       });
  
//       if (res.status(200)) {
//         return res.json({ status: "ok", data: token });
//       } else {
//         return res.json({ error: "error" });
//       }
//     }
//     res.json({ status: "error", error: "Invalid Password" });
//   });

// // Insert Flight Data csv to mongodb
 
// MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
//   .then((client) => {
//     console.log('Connected to MongoDB Atlas');
//     const db = client.db('holidayCentralDb');
//     const collection = db.collection('FlightData');

//     app.post('/upload', upload.single('file'), (req, res) => {
//       const results = [];
//       fs.createReadStream(req.file.path)
//         .pipe(csv())
//         .on('data', (data) => {
//           results.push(data);
//         })
//         .on('end', () => {
//           collection.insertMany(results, (err, result) => {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.status(200).send('Data uploaded successfully');
//             }
//           });
//         });
//     });

//     // Insert Hotel Data csv to mongodb
    
//     const collection1 = db.collection('HotelData');

//     app.post('/hotelupload', upload.single('file'), (req, res) => {
//       const results = [];
//       fs.createReadStream(req.file.path)
//         .pipe(csv())
//         .on('data', (data) => {
//           results.push(data);
//         })
//         .on('end', () => {
//             collection1.insertMany(results, (err, result) => {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.status(200).send('Data uploaded successfully');
//             }
//           });
//         });
//     });

//     // Insert Package Data csv to mongodb
    
//     const collection2 = db.collection('PackageData');

//     app.post('/packageupload', upload.single('file'), (req, res) => {
//       const results = [];
//       fs.createReadStream(req.file.path)
//         .pipe(csv())
//         .on('data', (data) => {
//           results.push(data);
//         })
//         .on('end', () => {
//             collection2.insertMany(results, (err, result) => {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.status(200).send('Data uploaded successfully');
//             }
//           });
//         });
//     });
    

// // get all users into a table

// app.get("/getAllUser",async(req,res)=>{
//   try{
//     const allUser = await User.find({});
//     res.send({status:"OK",data:allUser});
//   }catch(error){
//     console.log(error);
//   }
// })


// //delete user

// app.post("/deleteUser", async (req, res) => {
//   const { userid } = req.body;
//   try {
//     await User.deleteOne({ _id: userid });
//     res.send({ status: "ok", data: "Deleted" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: "error", message: "Failed to delete user" });
//   }
// });

//     app.listen(4000, () => {
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });

const express = require('express')
const bodyParser = require('body-parser');


const app = express();

const baseRouts = require('./routs/baseRoutsDB.js');


app.use('/', baseRouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



app.listen(4000)

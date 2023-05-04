const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const upload = multer({
	dest: 'uploads/'
});

const JWT_SECRET = "argsbdthbsw236w7r8g@1e*hfvh";

const mongoUrl = "mongodb+srv://webapigroupcw:WebCw2023@holidaycentral.lraqbqq.mongodb.net/holidayCentralDb?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("CONNECTED TO DATABASE");
}).catch((e) => console.log(e));

require("./models/userDetails");
const User = mongoose.model("UserInfo");

require("./models/flightDetails");
const Flight = mongoose.model("FlightData");

require("./models/hotelDetails");
const Hotel = mongoose.model("HotelData");

require("./models/packageDetails");
const Package = mongoose.model("PackageData");

router.use(express.json());
router.use(cors());


// Register API
router.post("/register", async (req, res) => {
	const {
		slct_permission,
		fname,
		lname,
		email,
		password
	} = req.body;
	const encryptedPassword = await bcrypt.hash(password, 10);
	try {
		const oldUser = await User.findOne({
			email
		});
		if (oldUser) {
			return res.send({
				status: "User Exists"
			});
		}
		await User.create({
			slct_permission,
			fname,
			lname,
			email,
			password: encryptedPassword,
		});
		res.send({
			status: "ok"
		});
	} catch (error) {
		res.send({
			status: "error"
		});
	}
});

// Login API
router.post("/login-user", async (req, res) => {
	const { email, password, slct_permission } = req.body;
  
	const user = await User.findOne({ email });
	if (!user) {
	  return res.json({ error: "User Not found" });
	}
  
	if (await bcrypt.compare(password, user.password)) {
	  if (slct_permission === "Backoffice Staff") {
		const token = jwt.sign({}, JWT_SECRET, {});
		return res.status(200).json({ status: "ok", data: token });
	  } else {
		return res.json({ error: "Permission Denied" });
	  }
	}
	res.json({ status: "error", error: "Invalid Password" });
  });
  

// Insert Flight Data to database through the API
MongoClient.connect(mongoUrl, {
		useUnifiedTopology: true
	})
	.then((client) => {

		const db = client.db('holidayCentralDb');
		const collection = db.collection('FlightData');

		router.post('/flightupload', upload.single('file'), (req, res) => {
			const results = [];
			fs.createReadStream(req.file.path)
				.pipe(csv())
				.on('data', (data) => {
					results.push(data);
				})
				.on('end', () => {
					collection.insertMany(results, (err, result) => {
						if (err) {
							res.status(500).send(err);
						} else {
							res.status(200).send('Data uploaded successfully');
						}
					});
				});
		});

		// Insert Hotel Data to db through the API

		const collection1 = db.collection('HotelData');

		router.post('/hotelupload', upload.single('file'), (req, res) => {
			const results = [];
			fs.createReadStream(req.file.path)
				.pipe(csv())
				.on('data', (data) => {
					results.push(data);
				})
				.on('end', () => {
					collection1.insertMany(results, (err, result) => {
						if (err) {
							res.status(500).send(err);
						} else {
							res.status(200).send('Data uploaded successfully');
						}
					});
				});
		});

		// Insert Package Data to db through the API

		const collection2 = db.collection('PackageData');

		router.post('/packageupload', upload.single('file'), (req, res) => {
			const results = [];
			fs.createReadStream(req.file.path)
				.pipe(csv())
				.on('data', (data) => {
					results.push(data);
				})
				.on('end', () => {
					collection2.insertMany(results, (err, result) => {
						if (err) {
							res.status(500).send(err);
						} else {
							res.status(200).send('Data uploaded successfully');
						}
					});
				});
		});

		// Get all users into a table API
		router.get("/getAllUser", async (req, res) => {
			try {
				const allUser = await User.find({});
				res.status(200).send({
					status: "OK",
					data: allUser
				});
			} catch (error) {
				console.log(error);
				res.status(500).send({
					status: "Error",
					message: "Something went wrong!"
				});
			}
		});
		

		// Delete user API

		router.delete("/deleteUser", async (req, res) => {
			const { userid } = req.body;
			try {
			  await User.deleteOne({ _id: userid });
			  res.status(200).send({
				status: "ok",
				data: "Deleted",
			  });
			} catch (error) {
			  console.error(error);
			  res.status(500).send({
				status: "error",
				message: "Failed to delete user",
			  });
			}
		  });
		  

		// get all flights data into a table through API

		router.get("/getAllFlights", async (req, res) => {
			try {
			  const allFlights = await Flight.find({});
			  res.status(200).send({
				status: "OK",
				data: allFlights,
			  });
			} catch (error) {
			  console.error(error);
			  res.status(500).send({
				status: "error",
				message: "Failed to retrieve flights",
			  });
			}
		  });
		  

		// Delete flights data API

		router.delete("/deleteFlight", async (req, res) => {
			const { flightid } = req.body;
			try {
			  await Flight.deleteOne({ _id: flightid });
			  res.status(200).send({
				status: "ok",
				data: "Deleted",
			  });
			} catch (error) {
			  console.error(error);
			  res.status(500).send({
				status: "error",
				message: "Failed to delete flight",
			  });
			}
		  });
		  


// get all Hotels data into a table through API
router.get("/getAllHotels", async (req, res) => {
	try {
	  const allHotels = await Hotel.find({});
	  res.status(200).send({
		status: "OK",
		data: allHotels
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({
		status: "error",
		message: "Failed to get hotels"
	  });
	}
  });
  
  // Delete hotels data API
  router.delete("/deleteHotel", async (req, res) => {
	const { hotelid } = req.body;
	try {
	  await Hotel.deleteOne({ _id: hotelid });
	  res.status(200).send({
		status: "ok",
		data: "Deleted"
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({
		status: "error",
		message: "Failed to delete hotel"
	  });
	}
  });
  
  // get all packages data into a table through API
  router.get("/getAllPackages", async (req, res) => {
	try {
	  const allPackages = await Package.find({});
	  res.status(200).send({
		status: "OK",
		data: allPackages
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({
		status: "error",
		message: "Failed to get packages"
	  });
	}
  });
  
  // Delete packages data API
  router.delete("/deletePackage", async (req, res) => {
	const { packageid } = req.body;
	try {
	  await Package.deleteOne({ _id: packageid });
	  res.status(200).send({
		status: "ok",
		data: "Deleted"
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({
		status: "error",
		message: "Failed to delete package"
	  });
	}
  });
  
	})
	


module.exports = router;
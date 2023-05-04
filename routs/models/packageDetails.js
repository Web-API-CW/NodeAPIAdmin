const { Int32 } = require("mongodb");
const mongoose  = require("mongoose")

const PackageDetailsSchema = new mongoose.Schema(
{
    packageName: String,
    destination: String,
    duration: Number,
    numTravelers: Number,
    specialty: String,
    final_price: Number,
    rating: String,
},
{
    collection: "PackageData",
}
);
mongoose.model("PackageData",PackageDetailsSchema);


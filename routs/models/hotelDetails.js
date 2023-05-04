const mongoose  = require("mongoose")

const HotelDetailsSchema = new mongoose.Schema(
{
    HotelName: String,
    Address: String,
    StarRating: String,
    RoomType: String,
    BoardBasis: String,
    CheckinDateTime: String,
    CheckoutDateTime: String,
    CabinClass: String,
    PriceperNight: String,
    Facilities: String,
    RoomAvailability: String
},
{
    collection: "HotelData",
}
);
mongoose.model("HotelData",HotelDetailsSchema);


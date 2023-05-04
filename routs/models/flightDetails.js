const mongoose  = require("mongoose")

const FlightDetailsSchema = new mongoose.Schema(
{
    FlightNumber: String,
    Departure: String,
    Arrival: String,
    DepartureDateTime: String,
    ArrivalDateTime: String,
    Duration: String,
    Airline: String,
    CabinClass: String,
    Price: String,
    SeatAvailability: String,
    MealOptions: String
},
{
    collection: "FlightData",
}
);
mongoose.model("FlightData",FlightDetailsSchema);


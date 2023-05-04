const mongoose  = require("mongoose")

const UserDetailsSchema = new mongoose.Schema(
{
    slct_permission: String,
    fname: {type:String,required:true},
    lname: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{
    collection: "UserInfo",
}
);
mongoose.model("UserInfo",UserDetailsSchema);


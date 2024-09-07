import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    dateOfBirth: { type: Date, required: true},
    password: {type: String, required: true},
    address: {type:{
        number: { type: String},
        street:{ type: String},
        city: { type: String, required: true},
        state: { type: String},
        zip: { type: String},
        country: { type: String, required: true}
    }, required:true,},
    products: [{type: mongoose.Types.ObjectId, require: true, ref: "Product"}],
});

const User = mongoose.model("User", userSchema);

export default User;
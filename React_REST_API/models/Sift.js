import mongoose from "mongoose";

const siftSchema = new mongoose.Schema({
    name: { type: String, require: true},
    sift: { type: String, require: true},
    postedAt: {type: Date, require: true},
    sift_r: {type: String, require: true},
    revision: {type: Number, require: true},
    date_r: {type: Date, require: true},
    ownerId: {mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Sift = mongoose.model("Product", siftSchema);

export default Sift;
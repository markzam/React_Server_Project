import mongoose from "mongoose";

const siftSchema = new mongoose.Schema({
    name: { type: String, required: true},
    sift: { type: String, required: true},
    postedAt: {type: Date, required: true},
    sift_r: {type: String, required: true},
    revision: {type: Number, required: true},
    date_r: {type: Date, required: true},
    ownerId: {type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Sift = mongoose.model("Product", siftSchema);

export default Sift;
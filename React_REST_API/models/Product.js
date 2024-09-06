import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    product: { type: String, required: true},
    postedAt: {type: Date, required: true},
    product_rev: {type: String, required: true},
    revision: {type: Number, required: true},
    date_r: {type: Date, required: true},
    ownerId: {type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
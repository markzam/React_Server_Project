import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    postedAt: {type: Date, required: true},
    ownerId: {type: mongoose.Types.ObjectId, required: true, ref: "User" },
    ownerEmail: { type: String, required: true},
    revision: { type: Number, required: true},
    lastUpdatedAt: {type: Date, required: true},
    // previousDescription: {type:[{previousDescription: { type: String}}],}
    
});

const Product = mongoose.model("Product", productSchema);

export default Product;
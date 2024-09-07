import express from 'express';
import { PRODUCT_NOT_FOUND_MESSAGE, USER_NOT_FOUND_MESSAGE } from '../constants/errorMessages.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';


const productsRouter = express.Router();

//GET/READ ALL PRODUCTS
productsRouter.get("/", async (_, res) => {
    console.log("-->Getting/Reading all sifts");
    try {
        const products = await Product.find();
        return res.send(products);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//POST A PRODUCT
productsRouter.post("/", async (req, res) => {
    console.log("-->Posting/Creating a new sift");
     try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findById(req.body.ownerId);

        if (!user) {
            return res.status(404).send(USER_NOT_FOUND_MESSAGE);
        }
        const timestamp = new Date()
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            postedAt: timestamp,
            ownerEmail: user.email,
            ownerId: req.body.ownerId,
            revision: 0,
            lastUpdatedAt: timestamp
            
        });

        await newProduct.save({session});

        user.products.push(newProduct);

        await user.save({session});

        await session.commitTransaction();

        return res.status(201).send(newProduct);

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
    
});

//GET A SINGLE PRODUCT
productsRouter.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if(!product) {
            return res.status(404).send(PRODUCT_NOT_FOUND_MESSAGE);
        }

        return res.send(product);

    } catch (error) {
        return res.status(500).send(error);
    }
});

productsRouter.put("/:productId", async (req, res) => {
    console.log("-->Updating a sift");
try {
    
    const productId = req.params.productId;
    //const previousProduct = await {...Product.description};
    const product = await Product.findByIdAndUpdate(productId, 
    {
        
        title: req.body.title,
        description: req.body.description,
        $inc : {revision: 1},
        lastUpdatedAt: new Date(),
        //previousDescription: previousProduct
    },
    
    
    {
new: true,
    }

);
    if (!product) {
        return res.status(404).send(PRODUCT_NOT_FOUND_MESSAGE);
    }
    return res.send(product);
} catch (error) {
    console.log(error)
    return res.status(500).send(error);
}
});

productsRouter.delete("/:productId", async (req, res) => {
    console.log("-->Deleting a Product/Sift");
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const product = await Product.findByIdAndDelete(req.params.productId).session(session);

        if(!product) {
            return res.status(404).send(PRODUCT_NOT_FOUND_MESSAGE);
        }

        const user = await User.findById(product.ownerId);
        
        if(!user) {
            return res.status(404).send(USER_NOT_FOUND_MESSAGE);
        }

        user.products.pull(product);

        await user.save({session});

        await session.commitTransaction();

        return res.send(product);
        
    } catch (error) {
        return res.status(500).send(error);
    }
});

export default productsRouter;
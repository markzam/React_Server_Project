import express from 'express';
import { USER_NOT_FOUND_MESSAGE } from "../constants/errorMessages.js";
import userValidator from "../Validators/userValidator.js";
import User from '../models/User.js';
import Product from '../models/Product.js';


const usersRouter = express.Router();

//This middleware get products by user
usersRouter.get("/:userId/products", async (req, res) => {
    const userId = req.params.userId;

    try {
        const userProducts = await Product.find({
            ownerId: userId,
        });
        return res.send(userProducts);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//This middleware get userId by request
usersRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).send(USER_NOT_FOUND_MESSAGE);
    
        return res.send({id: userId, email: user.email});
    } catch (error) {
        return res.status(500).send(error);
    }
 
    
});

//This middleware creates a user
usersRouter.post("/", async (req, res) => {
    
    const validationErrors = userValidator(req.body);

    if (validationErrors.length > 0) {
        res.status(400).send(validationErrors.join(", "))
        return;
    }

    const {firstName, lastName, email, dateOfBirth, password, repeatPassword, address} = req.body;

    if(password !== repeatPassword){
        res.status(400).send("Passwords don't match.");
        return;
    }

try {
    
    const user = await User.findOne({email: email})

    if(user) {
        res.status(400).send("An user with the provided email already exists.");
        return;
    }  
    
    const newUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        dateOfBirth,
        password,
        address
    })

    await newUser.save();
    
    return res.status(201).send({id: newUser.id});
    
} catch (error) {
   return res.status(500).send(error);
    
}

});

usersRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })

        if(!user){
            return res.status(401).send("Invalid credentials");
        }

        return res.send({ id: user.id});
    } catch (error) {
       return res.status(500).send(error);
        
    }
})


export default usersRouter;
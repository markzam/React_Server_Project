import express from 'express';
import dummySift from "../dummySift/dummySifts.js";
import DUMMY_USERS from "../dummySift/dummyUsers.js";
import { USER_NOT_FOUND_MESSAGE } from "../constants/errorMessages.js";
import userValidator from "../Validators/userValidator.js";


const usersRouter = express.Router();

//This middleware get products by user
usersRouter.get("/:userId/sifts", (req, res) => {
    const userId = req.params.userId;
    const user = DUMMY_USERS.find(user => user.id == userId);

    if (!user) return res.status(404).send(USER_NOT_FOUND_MESSAGE);

    const userSifts = dummySift.filter((sift) => sift.postedBy == userId);

    res.send(userSifts);
});

//This middleware get userId by request
usersRouter.get("/:userId", (req, res) => {
    const userId = req.params.userId;

    const user = DUMMY_USERS.find(user => user.id == userId);

    if (!user) res.status(404).send(USER_NOT_FOUND_MESSAGE)

    res.send({id: userId, email: user.email});
});

//This middleware creates a user
usersRouter.post("/", (req, res) => {
    const newUser = req.body;
    const validationErrors = userValidator(newUser);

    if (validationErrors.length > 0) {
        res.status(400).send(validationErrors.join(", "))
        return;
    }

    if(newUser.password !== newUser.repeatPassword){
        res.status(400).send("Passwords don't match.");
        return;
    }

    if(DUMMY_USERS.find((user) => user.email == newUser.email)) {
        res.status(400).send("An user with the provided email already exists.");
        return;
    }
    newUser.id = DUMMY_USERS.length + 1;    
    
    DUMMY_USERS.push(newUser);
    
    res.status(201).send({...newUser, password: null, repeatPassword: null});
});


export default usersRouter;
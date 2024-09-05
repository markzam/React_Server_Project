import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import siftsRouter from './routers/siftsRouter.js';
import usersRouter from './routers/usersRouter.js';
import mongoose from 'mongoose';
import 'dotenv/config'


const app = express();

app.use(cors({
    origin: process.env.UI_URL
}));

app.use(bodyParser.json());

app.use("/sifts", siftsRouter);

app.use("/users", usersRouter);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(()=> {
    console.log("Successfully connected to the database");
    const port = process.env.PORT ?? 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(e=>console.error(`Unable to connect to the database with error: ${e}`));



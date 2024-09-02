import express from 'express';
import bodyParser from 'body-parser';
import siftsRouter from './routers/siftsRouter.js';

const app = express();

app.use(bodyParser.json());

app.use("/sifts", siftsRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

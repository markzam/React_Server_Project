import express from 'express';
import bodyParser from 'body-parser';
import dummyData from "./dummyData/dummyData.js"

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next)=>{
    console.log("This is get");
    res.send(dummyData);
});

app.post("/", (req, res, next)=>{
    console.log("This is post");
    res.send(dummyData);
});

app.put("/", (req, res, next)=>{
    console.log("This is put");
    res.send(dummyData);
});

app.delete("/", (req, res, next)=>{
    console.log("This is delete");
    res.send(dummyData);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

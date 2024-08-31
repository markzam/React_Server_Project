import express from 'express';
import bodyParser from 'body-parser';
import dummySifts from "./dummySift/dummySifts.js"

const app = express();

app.use(bodyParser.json());

app.get("/sifts", (_, res) => {
    console.log("-->Getting/Reading all sifts");
    res.send(dummySifts);
});

app.post("/sifts", (req, res) => {
    console.log("-->Posting/Creating a new sift");
    const newSift = {
        ...req.body, 
        id: dummySifts.length + 1,
        postedAt: new Date(), 
        revision: 0
    };
    
    dummySifts.push(newSift);

    res.status(201).send(newSift);
});

app.put("/sifts/:siftId", (req, res) => {
    console.log("-->Putting/Updating a sift");
    const revDate = new Date
    const siftId = req.params.siftId;
    const siftToUpdate = dummySifts.find((p) => p.id === +siftId);
    

    if(!siftToUpdate) res.status(404).send("Product/Sift not found")
    
    siftToUpdate.sift = req.body.sift;
    siftToUpdate.revision = siftToUpdate.revision + 1;
    //siftToUpdate.revision = {...siftToUpdate, revision: req.body.revision + 1};
    console.log(siftToUpdate.revision);

    
    //siftToUpdate.revision = {revision: req.body.revision + 1};
    siftToUpdate.revDate = new Date;

    res.send(siftToUpdate);

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

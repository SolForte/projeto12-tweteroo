import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const REGISTERED_USERS = [];
const TWEETS = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;
    
    REGISTERED_USERS.push({username, avatar});

    res.status(200).send("OK");
})

app.post("/tweets", (req, res) => {
    res.status(201).json("OK");
});

app.get("/tweets", (req, res) => {
    res.status(200).send("OK");
})

const PORT = 5000;
app.listen(PORT);
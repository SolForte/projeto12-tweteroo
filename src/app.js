import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const REGISTERED_USERS = [];
const TWEETS = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  REGISTERED_USERS.push({ username, avatar });
  return res.status(200).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (
    !REGISTERED_USERS.find((e) => e.username === username) ||
    REGISTERED_USERS.length === 0
  ) {
    return res.status(401).send("UNAUTHORIZED");
  }
  TWEETS.push({ username, tweet });
  return res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  if (TWEETS.length <= 10) {
    const latestTweets = [...TWEETS].reverse();
    return res.status(200).send(latestTweets);
  }

  if (TWEETS.length > 10) {
    const latestTweets = [];
    //Using reverse for-loop to Loop through an array backward in JavaScript
    for (let i = TWEETS.length - 1; i >= TWEETS.length - 10; i--) {
      latestTweets.push(TWEETS[i]);
    }
    return res.status(200).send(latestTweets);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

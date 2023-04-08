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
  //For the purposes of looping through arrays backwards, reverse for-loop algorithms are used
  if (TWEETS.length <= 10) {
    const latestTweets = [];
    for (let i = TWEETS.length - 1; i >= 0; i--) {
      findTweetAvatar(i, latestTweets);
    }
    return res.status(200).send(latestTweets);
  }
  if (TWEETS.length > 10) {
    const latestTweets = [];
    for (let i = TWEETS.length - 1; i >= TWEETS.length - 10; i--) {
      findTweetAvatar(i, latestTweets);
    }
    return res.status(200).send(latestTweets);
  }
});

function findTweetAvatar(i, latestTweets) {
  for (let j = 0; j < REGISTERED_USERS.length; j++) {
    if (TWEETS[i].username === REGISTERED_USERS[j].username) {
      const username = TWEETS[i].username;
      const avatar = REGISTERED_USERS[j].avatar;
      const tweet = TWEETS[i].tweet;
      latestTweets.push({ username, avatar, tweet });
    }
  }
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

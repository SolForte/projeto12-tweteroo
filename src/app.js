import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const REGISTERED_USERS = [];
const TWEETS = [];

const ERROR_MESSAGE = "Todos os campos são obrigatórios!";
const SUCCESS_MESSAGE = "OK";

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || username.length === 0 || typeof username !== "string") {
    res.status(400).send(ERROR_MESSAGE);
    return;
  }

  if (!avatar || avatar.length === 0 || typeof avatar !== "string") {
    res.status(400).send(ERROR_MESSAGE);
    return;
  }

  REGISTERED_USERS.push({ username, avatar });
  res.status(201).send(SUCCESS_MESSAGE);
  return;
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || username.length === 0 || typeof username !== "string") {
    res.status(400).send(ERROR_MESSAGE);
    return;
  }

  if (!tweet || tweet.length === 0 || typeof tweet !== "string") {
    res.status(400).send(ERROR_MESSAGE);
    return;
  }

  if (
    !REGISTERED_USERS.find((e) => e.username === username) ||
    REGISTERED_USERS.length === 0
  ) {
    res.status(401).send("UNAUTHORIZED");
    return;
  }
  TWEETS.push({ username, tweet });
  res.status(201).send(SUCCESS_MESSAGE);
  return;
});

app.get("/tweets", (req, res) => {
  //For the purposes of looping through arrays backwards, reverse for-loop algorithms are used

  const NumeroDeTweets = 10;

  if (TWEETS.length <= NumeroDeTweets) {
    const latestTweets = [];
    for (let i = TWEETS.length - 1; i >= 0; i--) {
      findTweetAvatar(i, latestTweets);
    }
    res.status(200).send(latestTweets);
    return;
  }
  if (TWEETS.length > NumeroDeTweets) {
    const latestTweets = [];
    for (let i = TWEETS.length - 1; i >= TWEETS.length - NumeroDeTweets; i--) {
      findTweetAvatar(i, latestTweets);
    }
    res.status(200).send(latestTweets);
    return;
  }
});

function findTweetAvatar(i, latestTweets) {
  for (let j of REGISTERED_USERS) {
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

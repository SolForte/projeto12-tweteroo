import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const REGISTERED_USERS = [{
	username: 'bobesponja', 
	avatar: "a" 
}];
const TWEETS = [{
	username: "bobesponja",
  tweet: "Eu amo hambúrguer de siri!"
}];

const ERROR_MESSAGE = "Todos os campos são obrigatórios!";
const SUCCESS_MESSAGE = "OK";
const NUMERO_DE_TWEETS = 10;

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

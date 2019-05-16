const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: "783695",
  key: "13b13be20c4a53363def",
  secret: "3083ae3dc5a976463177",
  cluster: "eu",
  forceTLS: true
});

app.set("PORT", process.env.PORT || 5000);

app.post("/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("my-channel", "my-event", payload);
  res.send(payload);
});

app.listen(app.get("PORT"), () =>
  console.log("Listening at " + app.get("PORT"))
);

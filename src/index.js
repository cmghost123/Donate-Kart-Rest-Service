const express = require("express");
campaignRouter = require("./routes/campaigns");

const app = express();

app.use(express.json());

app.use(campaignRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/*", (req, res) => {
  res.status(404).send("<h2> NOT FOUND</h2>");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

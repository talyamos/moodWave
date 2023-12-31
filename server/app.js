const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const artistRouts = require("./routes/artist.routes");
const playlistRouts = require("./routes/playlist.routes");
const songRoutes = require("./routes/song.routes");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();


const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/artists", artistRouts);
app.use("/api/v1/playlists", playlistRouts);
app.use("/api/v1/songs", songRoutes);

app.get("/test", (req, res) => {
  res.send("talya");
});

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(400).send(error.message);
});

module.exports.app = app;

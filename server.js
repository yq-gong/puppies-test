const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  config = require("./config/DB"),
  itemRoutes = require("./expressRoutes/itemRoutes");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, dbName: "test" }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

// const schema = new mongoose.Schema(
//   {
//     name: String,
//   },
//   {
//     capped: { size: 1024 },
//     bufferCommands: false,
//     autoCreate: false, // disable `autoCreate` since `bufferCommands` is false
//   }
// );


const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.use("/items", itemRoutes);
const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log("Listening on port " + port);
});

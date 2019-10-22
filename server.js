let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads" });
let cookieParser = require("cookie-parser");

const config = require(__dirname + "/config.json");
const profile = process.argv[2]? process.argv[2]: 'prod';

app.use(cookieParser());
// let sha1 = require("sha1");
app.use("/", express.static("build/dist"));
app.use("/", express.static("build"));
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://a:a@personalproject-zknku.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db("personal-project");
  }
);
let sessions = {};

let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
app.use("/", express.static("build"));
app.use("/", express.static("public"));

app.post("/signup", upload.none(), asyncHandler(async (req, res) => {
  console.log("signup", req.body);
  const { username, password } = req.body;
  try {
    const x = await dbo.collection("users").insertOne({ username, password });
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false })
  }
}));

app.post("/login", upload.none(), asyncHandler(async (req, res) => {
  console.log("login", req.body);
  const {username, password} = req.body;

  const query = { $and: [
    { 'username': { $eq: username } },
    { 'password': { $eq: password } }
  ] };
  const columns = { username: 1, password: 1 };
  const user = await dbo.collection("users").findOne(query, columns);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}));

app.post("/logout", upload.none(), asyncHandler(async (req, res) => {
  // TODO: ?
  res.json({ success: false });
}));

app.post("/addevent", upload.none(), asyncHandler(async (req, res) => {
  let newEvent = { username, location, title, sport, amount, date } = req.body;
  // TODO: db calls
  console.log(`event added: ${newEvent}`);
  res.json({ newEvent, success: true });
}));

app.listen(config["profiles"][profile]["port"], "0.0.0.0", () => {
  console.log(`Server running on port ${config["profiles"][profile]["port"]}`);
});

function asyncHandler(fn) {
  return (req, res, next) => {
    return Promise
      .resolve( fn(req, res, next) )
      .catch(next)
  }
}

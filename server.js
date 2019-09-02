let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads" });
reloadMagic(app);
// let sha1 = require("sha1");
app.use("/", express.static("build"));
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://a:a@personalproject-zknku.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("personal-project");
});
reloadMagic(app);
let sessions = {};

let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
app.use("/", express.static("build"));
app.use("/", express.static("public"));

app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  console.log("TESTING:", name, pwd);
  dbo.collection("users").insertOne({ username: name, password: pwd });
  res.send(JSON.stringify({ success: true }));
});

app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
    }
    if (user.password === password) {
      res.send(JSON.stringify({ success: true }));
      console.log("password matches");
      let sessionId = generateId();
      console.log("generated id", sessionId);
      sessions[sessionId] = username;
      res.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
      return;
    }
    if (user.password === null) {
      res.send(JSON.stringify({ success: false }));
    }
    res.send(JSON.stringify({ success: false }));
  });
});
app.post("/AddEvent", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  let eventName = req.body.title;
  let eventDesc = req.body.description;
  let EventID = generateId();
  let newEvent = {
    description: eventDesc,
    eventName: eventName,
    ID: EventID,
    user: username,
    userId: req.cookies.sid
  };
  JSON.stringify(newEvent);
  console.log("event added");
});

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

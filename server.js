(async () => {
  const express = require("express");
  const { MongoClient, ObjectId } = require("mongodb");
  const upload = require("multer")({ dest: `${__dirname}/uploads` });
  const cookieParser = require("cookie-parser");
  const bodyParser = require("body-parser");
  const path = require("path");
  const sha1 = require("sha1");
  const _ = require("lodash");

  const config = require(__dirname + "/config.json");
  const profileName = process.argv[2]? process.argv[2]: 'prod';
  const profile = config["profiles"][profileName];

  const [mongoUrl, mongoConfig] = [
    "mongodb+srv://a:a@personalproject-zknku.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ];
  const db = (await MongoClient.connect(mongoUrl, mongoConfig)).db("personal-project");

  // /api/*
  const apiRouter = express.Router();
  apiRouter.use(cookieParser());
  apiRouter.use(bodyParser.json());

  apiRouter.post("/signup", upload.none(), asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const x = await db.collection("users").insertOne({ username, password });
        res.json({ success: true });
      } catch (e) {
        res.json({ success: false, message: "username is already taken" })
      }
    } else {
      res.json({ success: false, message: "username and password must be non-empty" })
    }

  }));

  apiRouter.post("/login", upload.none(), asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    const query = {
      $and: [
        { 'username': { $eq: username } },
        { 'password': { $eq: password } }
      ]
    };
    const columns = { username: 1, password: 1 };
    const user = await db.collection("users").findOne(query, columns);

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "username or password incorrect" });
    }
  }));

  apiRouter.post("/logout", upload.none(), asyncHandler(async (req, res) => {
    // TODO: ?
    res.json({ success: false });
  }));

  apiRouter.post("/addevent", upload.none(), asyncHandler(async (req, res) => {
    let { username, location, name, sport, numPlayers, date } = req.body;
    const newEvent = { username, location, name, sport, numPlayers, date };
    console.log(newEvent);

    // validate input
    if (_.some([username, location, name, sport, date], s => !s || typeof(s)!=="string")) {
      res.json({ success: false, message: "[username, location, name, sport, date] must be nonemtpy strings" });
      return;
    }
    numPlayers = Number(numPlayers);
    if (!numPlayers || typeof(numPlayers)!=="number" || numPlayers<1 || numPlayers>30 || numPlayers%1!==0) {
      res.json({ success: false, message: "numPlayers must be integer in range 1 to 30 (inclusive)" });
      return;
    }
    // TODO: moment.js to validate date?

    try {
      db.collection("events").insertOne(newEvent);
      res.json({ newEvent, success: true });
    } catch (e) {
      res.json({ success: false, message: "failed to create new event, (name, date, location) not unique" })
    }
  }));

  apiRouter.post("/getevent", asyncHandler(async (req, res) => {
    const {sportEventId: _id} = req.body;
    const sportEvent = await db.collection("events").findOne({_id: ObjectId(_id)});
    if (sportEvent) {
      res.json({ success: true, sportEvent });
    } else {
      res.json({ success: false, message: "could not find sport event with that id" });
    }
  }));

  apiRouter.post("/getevents", asyncHandler(async(req, res) => {
    res.json(await (await db.collection("events").find({})).toArray());
  }));

  apiRouter.post("/getparticipants", asyncHandler(async(req, res) => {
    const query = { eventId: ObjectId(req.body.sportEventId) };
    const participations = await (await db.collection("participations").find(query)).toArray();
    res.json({ participations });
  }));

  // the app
  const app = express();
  app.use("/api", apiRouter)
  app.use("/uploads", express.static("uploads"));
  app.use("/", express.static("build"));
  app.use("/", (req, res) => {res.sendFile(path.join(__dirname, "build", "index.html"))});

  app.listen(profile["port"], "0.0.0.0", () => {
    console.log(`Server running on port ${profile["port"]}`);
  });
})();

function asyncHandler(fn) {
  return (req, res, next) => {
    return Promise
      .resolve( fn(req, res, next) )
      .catch(next)
  }
}

const express = require("express");
const app = express();
const jsonParser = express.json();
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let dbClient, id = 0, currentListDevs;

const clientPath = __dirname.slice(0,-7);

app.use(express.static(clientPath + "/client"));

mongoClient.connect((err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  app.locals.devs = client.db("devsData").collection("devs");
  dbClient = client;
  app.listen(3000, () => {
    console.log("server is starting...");
  });
});

app.get("/api/devs", (req, res) => {
  const devs = req.app.locals.devs;
  devs.find().toArray((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    currentListDevs = result;
    res.send(JSON.stringify(result));
  });
});

// ----------------- then remove
app.get("/api/deleteAll", (req, res) => {
  const devs = req.app.locals.devs;
  devs.drop((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end();
  });
});

app.get("/api/test", (req, res) => {
});
// --------------------------------

app.post("/api/addDevs",jsonParser, (req,res) => {
  //defining the maximum id the data base ====
  let tmp = 0;
  for (let i = 0; i < currentListDevs.length; i++) {
    if(currentListDevs[i].id > tmp) id = currentListDevs[i].id;     
  }
  // ======
  if (!req.body) res.sendStatus(400);
  const person = {
    id: ++id,
    name: req.body.name,
    position: req.body.position,
    skills: req.body.skills
  }
  req.app.locals.devs.insertOne(person, (err, result) => {
    if (err) console.log(err);
    res.end();
  })
});

app.put("/api/updateDevs", jsonParser, (req, res) => {
  if(!req.body) res.sendStatus(400);
  req.app.locals.devs.findOneAndUpdate({id: req.body.id}, {
    $set: {
      name: req.body.name,
      position: req.body.position,
      skills: req.body.skills
    }
  }, 
  {
    returnOriginal: false
  }
  , (err, result) => {
    if (err) console.log(err);
    const user = result.value;
    res.send(user);
  })
});

app.delete("/api/deleteDevs/:id", (req,res) => {
  const id = req.params.id;
  const devsCollection = req.app.locals.devs;
  devsCollection.findOneAndDelete({id:id}, (err, result) => {
    if(err) console.log(err);
    const person = result.value;
    res.send(person);
  });
});

app.use("/", (req, res) => {
  res.sendFile(clientPath + "/client/index.html");
});

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
})


let express = require('express');
let app = express();
console.log("Hello World");
var bodyParser = require("body-parser");


app.use(function middleware(req, res, next) {
console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
});


 app.get("/", (req, res) => {
  /*res.send("");*/
  absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath)
});

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

/*app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });*/
 // now becomes "HELLO WORLD"

app.get("/json", (req, res) => {
if(process.env['MESSAGE_STYLE'] == 'uppercase'){
res.json({'message': 'HELLO JSON'})
}else{
res.json({'message': 'Hello json'})
}
});


const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});


app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});


app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});


























 module.exports = app;

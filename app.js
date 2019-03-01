const connection = require("./setting/mongoConnection");
const express = require("express");
const bodyParser = require("body-parser");
const configRoutes = require("./routes");
const path = require('path');
const hbs = require('express-handlebars');
const cookieParser = require("cookie-parser");

const app = express();

app.engine('hbs',hbs({extname:'hbs',defaultLayout:'main',layoutsdir:__dirname+'/views/layouts'}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');


app.use("/public",express.static(__dirname+"/public/"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3000, (res,err) => {
  if(err) throw console.log('Problem in connecting to Localhost');
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
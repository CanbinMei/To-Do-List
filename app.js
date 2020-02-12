// Install the npm package: npm i express body-parser

// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");

// Require the date.js module from me.
const date = require(__dirname + "/date.js");

// Use express.
const app = express();

// The local port number my server start on.
const port = 3000;

// Default-to-do list array.
const items = [];
// Work-to-do list array.
const workItems = [];

// Use ejs, have to create a "views" folder and put all the ejs file in it.
app.set('view engine', 'ejs');

// For express to use external files, see the public folder.
app.use(express.static("public"));

// For using body-parser.
app.use(bodyParser.urlencoded({
  extended: true
}));

// The server listen to port = 3000 and the port Heroku assigned.
app.listen(process.env.PORT || port, function() {
  console.log("Server started on port 3000");
})

// Get request from "/".
app.get("/", function(req, res) {
  let day = date.getDate();   // Call getDate() from date.js --> Ex: Monday, February 10.
  // let day = date.getDay();    // Call getDay() from date.js --> Ex: Monday.
  res.render("list", {    // Send list.ejs to "/" page.
    listTitle: day,   // <%= listTitle %> in list.ejs.
    newListItems: items   // Render the items in Default-to-do list array --> <%= newListItems[i] %> in list.ejs.
  });
});

// Post request to "/".
app.post("/", function(req, res){
  let item = req.body.newItem;    // Save the text input from the form in list.ejs .
  if(req.body.list === "Work") {    // If the value of the button called list(The h1 --> the title.) === "Work".
                                    // Actually the value is "Work List", but it is working. See "listTitle" in app.get("/work").

    workItems.push(item);   // Push the value of "item" to Work-to-do list array.
    res.redirect("/work");  // Redirect to "/work" page.
  } else {  // Anthing else, in this case the current day. Ex: Monday, February 10.
    items.push(item);   // Push the value of "item" to Default-to-do list array.
    res.redirect("/");  // Redirect to "/" page.
  }
});

// Get request from "/work".
app.get("/work", function(req, res){
  res.render("list", {    // Send list.ejs to "/work" page.
    listTitle: "Work List",   // Set the h1 --> the title to "Work List".
    newListItems: workItems   // Render the items in Work-to-do list array --> <%= newListItems[i] %> in list.ejs.
  });
})

// Get request from "/about".
app.get("/about", function(req, res){
  res.render("about");    // Render about.ejs.
})

const fs = require("fs");
const path = require("path");
const userData = require('./src/app/usersData.js');


const data = JSON.stringify(userData);

const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
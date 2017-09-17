var mysql = require('mysql');
var Colors = require('colors');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "mortyroadDB"
});

// connection.connect(function(err) {
//   if (err) throw err;
//   // console.log("connected as id " + connection.threadId);
//   console.log("<-------------------------------------------------------------------------------------->".yellow);
//   console.log("<-------------------------------------------------------------------------------------->".blue);
//   console.log("Welcome to MortyRoad your interdimensional underground online shopping store!".bgWhite.blue);
//   console.log("<-------------------------------------------------------------------------------------->".yellow);
// });

mortyManager();


function mortyManager() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Hello Rick, what would you like to do?",
      choices: [
        "View Products for Sale".green,
        "View Low Inventory".green,
        "Add to Inventory".green,
        "Add New Product".green,
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale".green:
          viewProducts();
          break;

        case "View Low Inventory".green:
          viewLowInventory();
          break;

        case "Add to Inventory".green:
          addInventory();
          break;

        case "Add New Product".green:
          songSearch();
          break;

      }
    });
}

function viewProducts() {
  connection.query('SELECT * FROM products', function(err, items){
    if (err) throw err;
    for(var i = 0; i<items.length; i++){
      console.log(items[i].item_id + "  ||  ".red+items[i].product_name+"  ||  ".red+items[i].department_name+"  ||  ".red+items[i].price+"  ||  ".red+items[i].stock_quantity+"  ||  ".red);
    }
      setTimeout(mortyManager,5000);
  });
}

function viewLowInventory() {
  connection.query('SELECT * FROM products', function(err, items){
    if (err) throw err;
    for(var i = 0; i<items.length; i++){
      if (items[i].stock_quantity < 5000) {
        console.log(items[i].item_id + "  ||  ".red+items[i].product_name+"  ||  ".red+items[i].department_name+"  ||  ".red+items[i].price+"  ||  ".red+items[i].stock_quantity+"  ||  ".red);
      } else {
        console.log(items[i].item_id + "  ||  ".red+items[i].product_name+ " is at an acceptable level".blue)
      }
    }
      setTimeout(mortyManager,10000);
  });
}

// console.log("Inventory for " + items[i].item_id + "  ||  ".red + items[i].product_name+"  ||  ".red " is good man");

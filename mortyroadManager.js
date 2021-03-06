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
          addProduct();
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
function addInventory() {
  connection.query('SELECT * FROM products', function(err, items){
    if (err) throw err;
    for(var i = 0; i<items.length; i++){
      console.log(items[i].item_id + "  ||  ".red+items[i].product_name+"  ||  ".red+items[i].department_name+"  ||  ".red+items[i].price+"  ||  ".red+items[i].stock_quantity+"  ||  ".red);
    }
    inquirer.prompt([
      {
        type:"input",
        message: "Which Item would you like to increase inventory for?".underline.green,
        name:"id"
      },
      {
        type:"input",
        message:"How many units would you like to increase inventory?".underline.green,
        name:"quantity"
      }

    ]).then (function (po){
      var quantity = po.quantity;
      var id = po.id;
      var quan = parseInt(quantity);
      connection.query('SELECT * FROM products WHERE item_id=' + id, function(err, pickedItem){
        if (err) throw err;
        if(quantity > 0) {
          connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [pickedItem[0].stock_quantity + quan, id],
          function(err, items) {
            if (err) throw err;

            console.log("Inventory " + pickedItem[0].product_name + " has been increased by " + quantity);

            setTimeout(mortyManager, 3000);
          });

        } else {
          console.log("You want to add nothing? What are you, some kind of Jerry?".bgWhite.red);
          console.log("Let's try this again, and pay attention to the quantity this time!!!!".bgBlack.magenta);
          setTimeout(mortyManager, 3000);
         }
      });
    });
  });
}

function addProduct() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What item that you stole would you like to add to inventory?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place this item in?"
      },
      {
        name: "price",
        type: "input",
        message: "What would you like the price to be for this item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
        {
          name: "quantity",
          type: "input",
          message: "How many of these items do you want to put in inventory?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.name,
          department_name: answer.category,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was created successfully! Run the 'View Products for Sale' to see it in inventory!");
          setTimeout(mortyManager, 3000);
        }
      );
    });
}

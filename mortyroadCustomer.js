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

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  console.log("<-------------------------------------------------------------------------------------->".yellow);
  console.log("<-------------------------------------------------------------------------------------->".blue);
  console.log("Welcome to MortyRoad your interdimensional underground online shopping store!".bgWhite.blue);
  console.log("<-------------------------------------------------------------------------------------->".yellow);
});


function purchase() {
  connection.query('SELECT * FROM products', function(err, items){
    if (err) throw err;
    // console.log("hello");
    for(var i = 0; i<items.length; i++){
      console.log(items[i].item_id + "  ||  ".red+items[i].product_name+"  ||  ".red+items[i].department_name+"  ||  ".red+items[i].price+"  ||  ".red+items[i].stock_quantity+"  ||  ".red);
    }
    inquirer.prompt([
      {
        type:"input",
        message: "What would you like to purchase?".underline.green,
        name:"id"
      },
      {
        type:"input",
        message:"How many would you like to purchase?".underline.green,
        name:"quantity"
      }

    ]).then (function (po){
      var quantity = po.quantity;
      var id = po.id;
      connection.query('SELECT * FROM products WHERE item_id=' + id, function(err, pickedItem){
        if (err) throw err;
        if(pickedItem[0].stock_quantity - quantity >= 0) {
          console.log("MortyRoad can sell you that - ".green + pickedItem[0].product_name.red);
          console.log("You have placed an order for " + pickedItem[0].product_name.red + " and the cost will be " + [quantity * pickedItem[0].price]+ " Schmeckles");

          connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [pickedItem[0].stock_quantity - quantity, id],
          function(err, items) {
            if (err) throw err;
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("Congrats on your purchase of our amazing " + pickedItem[0].product_name.red + " product!");
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("Your order will take 48 hours to process. Please feel free to continue to use MortyRoad.".green);
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("Your one stop shop for all the illegal things from all the timelines and universes imaginable.".green);
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("<-------------------------------------------------------------------------------------->".grey);
            console.log("And now, back to shopping..................");

            setTimeout(purchase, 5000);
          });

        } else {
          console.log("Not enough units available. What are you, some kind of Jerry?".bgWhite.red);
          setTimeout(purchase, 3000);
         }
      });
    });
  });
}

purchase();

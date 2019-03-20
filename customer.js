var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
require('dotenv').config()
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.SECRET_KEY,
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("Hello and welcome! Let's go shopping!  " + connection.threadId);
    //connection.end();

    bamazon(); //let's start this up

});

// show initial inventory
function bamazon() {
    connection.query('SELECT * FROM bamazon_db.products', function (err, res) {
        if (err) throw err;

        // fancyish table display 
        var table = new Table({
            head: ["Product ID", "Product Name", "Department Name", "Price", "Quantity"],
            colWidths: [12, 75, 20, 12, 12],
        });

        // loop through entire inventory and print to table in console
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
            );
        }

        console.log(table.toString());

        // inquirer
        inquirer.prompt([{
                    type: "number",
                    message: "What item are you interested in buying? Please enter Id number.",
                    name: "id"
                },
                {
                    type: "number",
                    message: "Would you like to purchase more than one of this item?",
                    name: "quantity"
                },
            ])

            // order function
            .then(function (cart) {

                var quantity = cart.quantity;
                var itemID = cart.id;

                connection.query('SELECT * FROM products WHERE id=' + itemID, function (err, selectedItem) {
                    if (err) throw err;

                    //check inventory
                    if (selectedItem[0].stock_quantity - quantity >= 0) {

                        console.log("Let me verify quantities for you: Quantity in Stock: " + selectedItem[0].stock_quantity + " Order Quantity: " + quantity);

                        console.log("Today is your lucky day! We have plenty of  " + selectedItem[0].product_name + " for you!");


                        // Cost rounded to two cents
                        console.log("Thank you for supporting bamazon. Your amount due is " + (cart.quantity * selectedItem[0].price).toFixed(2) + " dollars.", "\nThank you for supporting your local bamazon!");

                        //remove the item from inventory                      
                        connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selectedItem[0].stock_quantity - quantity, itemID],

                            function (err, inventory) {
                                if (err) throw err;

                                bamazon(); // customer can continue shopping
                            }); //removes item from inventory

                    }
                    // low inventory warning
                    else {
                        console.log("Uh oh, Looks like this is a popular item because: \nbamazon only has " + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name + " remaining. \nPlease feel free to browse our many other items.", "\nThank you. We sincerely appreciate your business and hope you have a wonderful day!");

                        bamazon(); //the customer can continue shopping.
                    }
                });
            });
    });
} // ends bamazon
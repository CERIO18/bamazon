DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT NULL,
  stock_quantity INT(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bubble gum", "food and grocery", 1.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("peanut butter", "food and grocery", 3.50, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo", "toiletry", 11.50, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("neon paper", "office supplies", 111.01, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tomato seeds", "garden center", .50, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("inspirational quote stickers", "trending", .11, 1025);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gold happy face earrings", "jewelry", 250.00, 71);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("world's most comfortable socks", "clothing", 7.50, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("happiness", "wellness center", 25,000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("courage", "wellness center", 20.00, 0);






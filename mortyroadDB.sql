DROP DATABASE IF EXISTS mortyroadDB;

CREATE DATABASE mortyroadDB;

USE mortyroadDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR (100) NULL,
price DECIMAL (20, 2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Gwendolyn", "Entertainment", 8000.17, 2500);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Microverse Battery", "Electronics", 2000.38, 10000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Mr. Meeseeks Box", "Home", 10000.45, 6000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Interdimensional Cable Box", "Entertainment", 1500.12, 100000000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Portal Gun", "Travel", 50000000.01, 8);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Dream Inceptor", "Entertainment", 6599.99, 100000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Ball Fondlers Complete Series", "TV/DVD", 150.25, 1000000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Criterion Collection: Two Brothers", "TV/DVD", 55.69, 10000000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Criterion Collection: Jan Quandrant Vincent 16", "TV/DVD", 55.96, 3000000);

INSERT INTO products (product_name,  department_name,  price, stock_quantity)
VALUES ("Planet Music: The Complete Series", "TV/DVD", 100.54, 55000000);

-- INSERT INTO products (product_name,  department_name,  price, stock_quantity)
-- VALUES ();
-- 
SELECT * FROM products;

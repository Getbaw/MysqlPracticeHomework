// one: import modules

const express = require("express");

const mysql = require("mysql2");

// const bodyParser = require("body-parser");
//two: initiate express
let app = express();

//use body parser as middleware
app.use(app.json());
app.use(app.urlencoded({ extended: true }));
//step five: steup dB and user in myPhpadmin

//step seven: test API

app.get("/test", (req, res) => {
  res.send("backend is working");
});

//step: four set up DB connection
let dBconnection = mysql.createConnection({
  user: "myDBuser",
  password: "myDBuser@1234",
  host: "localhost",
  port: 8889,
  database: "myDB",
});

//step six: connect with dB
dBconnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("dB Connected successfully");
  }
});

//step: eghit: creat table

app.get("/createtable", (req, res) => {
  // products table
  let createProducts = `CREATE TABLE if not exists Products(
        product_id int auto_increment,
        product_url varchar(255) not null,
        product_name varchar(255) not null,
        
        PRIMARY KEY (product_id)
    )`;

  // product description table
  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
      description_id int auto_increment,
      product_id int(11) not null,
      product_brief_description varchar(255) not null,
      product_description varchar(255) not null,
      product_img varchar(255) not null,
      product_link varchar(255) not null,

      PRIMARY KEY (description_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

  // product price table
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
      price_id int auto_increment,
      product_id int(11) not null,    
      starting_price varchar(255) not null,
      price_range varchar(255) not null,

      PRIMARY KEY (price_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
  dBconnection.query(createProducts, (err, data, fields) => {
    if (err) console.log(err);
  });
  dBconnection.query(createProductDescription, (err, data, fields) => {
    if (err) console.log(err);
  });
  dBconnection.query(createProductPrice, (err, results) => {
    if (err) console.log(err);
  });
  res.send("Tables created successfully");
});

// insert iPhone data into tables
app.post("/add-product", (req, res) => {
  //products table
  let product_name = req.body.product_name;
  let product_url = req.body.product_url;
  //product_description table
  let product_brief_description = req.body.product_brief_description;
  let product_description = req.body.product_description;
  let product_img = req.body.product_img;
  let product_link = req.body.product_link;
  //product_price table
  let starting_price = req.body.starting_price;
  let price_range = req.body.price_range;

  let insertProduct = `INSERT INTO Products (product_name, product_url) VALUES ("${product_name}", "${product_url}" )`;
  dBconnection.query(insertProduct, (err) => {
    if (err) {
      console.log(err);
      res.end("err");
    }
  });
  const selectProductId = `SELECT product_id FROM Products WHERE product_name = "${req.body.product_name}"`;
  dBconnection.query(selectProductId, (err, results) => {
    const product_id = results[0].product_id;
    if (err) {
      console.log(err);
      res.end("err");
    } else {
      let insert_product_description = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES ("${product_id}", "${product_brief_description}", "${product_description}", "${product_img}", "${product_link}")`;

      let insert_product_price = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES ("${product_id}", "${starting_price}", "${price_range}")`;
      dBconnection.query(insert_product_description, (err) => {
        if (err) {
          console.log(err);
          res.end("err");
        }
      });
      dBconnection.query(insert_product_price, (err) => {
        if (err) {
          console.log(err);
          res.end("err");
        }
      });
    }
  });
});


//three: creat server
let port = 2627;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is listening on port ${port}`);
  }
});

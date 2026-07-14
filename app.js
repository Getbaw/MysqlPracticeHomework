// one: import modules

const express = require("express");

const mysql = require("mysql2");

//two: initiate express 
let app = express();

//step five: steup dB and user in myPhpadmin

//step seven: test API

app.get('/test', (req, res) =>{
    res.send('backend is working');
})

//step: four set up DB connection
let dBconnection = mysql.createConnection({
  user: "myDBuser",
  password: 'myDBuser@1234',
  host: 'localhost',
  port: 8889,
  database: 'myDB'
});

//step six: connect with dB
dBconnection.connect((err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('dB Connected successfully');
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
 dBconnection.query(createProducts, (err) => {
    if (err) console.log(err);
    });
dBconnection.query(createProductDescription, (err) => {
    if (err) console.log(err);
    });
dBconnection.query(createProductPrice, (err, results) => {
    if (err) console.log(err);
    });
res.send('Tables created successfully');

});


//three: creat server
let port = 2627;
app.listen(port, (err) =>{
if(err){
    console.log(err);
}else{
    console.log(`server is listening on port ${port}`);
}
});

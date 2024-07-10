const fs = require("fs");

// Use fs aqui no seu código

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "adimin",
  password: "duda2004",
  database: "fc",
  multipleStatements: true,
});

const sql = fs.readFileSync(__dirname + "/script.sql", "utf8");

connection.query(sql, (error, results) => {
  if (error) throw error;
  console.log("Script executado com sucesso:", results);
  connection.end();
});

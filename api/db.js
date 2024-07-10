import mysql2 from "mysql2";

export const bd = mysql2.createConnection({
  host: "localhost",
  user: "adimin",
  password: "duda2004",
  database: "fc",
});

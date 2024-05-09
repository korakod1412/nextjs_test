import mysql from "mysql";
var connection = mysql.createConnection({
  host: "192.168.56.1",
  port: 3307,
  user: "root",
  password: "Appw0rks@",
  database: "costsheet",
});

connection.connect();

connection.query(
   //"select * from  costsheet",
  "truncate table costsheet",
  function (error: any, results: any, fields: any) {
    if (error) throw error;
    console.log("delete completed ");
    //console.log(JSON.stringify(results));
  },
);

connection.end();
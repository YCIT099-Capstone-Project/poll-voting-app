const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "test",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO users ('name', 'password','email') VALUES (?)";
  const values = [req.body.name, req.body.password, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json({ error: err });
    } else {
      return res.json({ data: data });
    }
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

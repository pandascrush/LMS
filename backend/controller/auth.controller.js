import db from "../config/db.config.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(query, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ message: "Login successful" });
    } else {
      res.send({ message: "Invalid credentials" });
    }
  });
};

export const register = async (req, res) => {
  const { name, email, phno, password, repassword } = req.body;
  console.log(name, email, phno, password, repassword);
  const sql = `INSERT INTO userregister (Name, Phno, Email, Password, Retype_password) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [name, phno, email, password, repassword], (err, result) => {
    if (err) {
      res.json({ msg: err });
    } else {
      res.json({ msg: "User registered successfully" });
    }
  });
};

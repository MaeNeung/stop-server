const express = require("express");
const app = express();
const path = require("path");
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection(dbconfig);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});

app.get("/", (req, res) => {
  res.send("Main");
});

app.post("/", function (req, res) {
  res.send("Got a POST request");
});

app.post("/login", (req, res) => {
  connection.query(
    `SELECT * from user_data WHERE email = "${req.body.email}"`,
    (err, rows) => {
      if (err) {
        res.status(404);
        res.send("error");
        return;
      }
      if (rows[0].pw === req.body.pw) {
        res.status(200);
        res.send({ ...rows[0], pw: undefined });
      } else {
        res.status(401);
        res.send("비밀번호가 잘못되었습니다.");
      }
    }
  );
});

app.get("/user/:id", function (req, res) {
  const id = req.params.id;
  connection.query(`SELECT * from user_data WHERE id = ${id}`, (err, rows) => {
    if (err) console.log(err);
    res.send({ ...rows[0], pw: undefined });
  });
});

app.get("/user/insert", function (req, res) {
  const sql = `INSERT INTO user_data (user_name, email, phone_number, pw, bank_number, bank, connecting) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    "user1",
    "user@a.com",
    "010-1111-1111",
    "1111",
    "1111",
    "testbank",
    1,
  ];
  connection.query(sql, params, function (err, rows, fields) {
    if (err) console.log(err);
    res.redirect("/user");
  });
});

app.get("/user/delete/:id", function (req, res) {
  const sql = "DELETE FROM user_data WHERE id = ?";
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) console.log("error");
    console.log(result);
    res.redirect("/user");
  });
});

app.put("/user/:id", function (req, res) {
  connection.query(
    `SELECT * from user_data WHERE id = ${req.params.id}`,
    (err, outerRows) => {
      if (err) console.log(err);
      const sql = `UPDATE user_data SET user_name=?, email=?, phone_number=?, pw=?, bank_number=?, bank=?, connecting=? WHERE id=${req.params.id}`;

      const data = { ...outerRows[0], ...req.body };

      connection.query(
        sql,
        [
          data.user_name,
          data.email,
          data.phone_number,
          data.pw,
          data.bank_number,
          data.bank,
          data.connecting,
        ],
        function (err, rows) {
          if (err) console.log(err);
          const id = req.params.id;
          connection.query(
            `SELECT * from user_data WHERE id = ${id}`,
            (err, rows) => {
              if (err) console.log(err);
              res.send({ ...rows[0], pw: undefined });
            }
          );
        }
      );
    }
  );
});

app.get("/calendar", function (req, res) {
  connection.query("SELECT * from calendar", (err, rows) => {
    if (err) console.log(err);
    res.send(rows);
  });
});

app.post("/calendar", function (req, res) {
  const sql = `INSERT INTO calendar (title, content, cal_date, participant, id) VALUES(?, ?, ?, ?, ?)`;
  const body = req.body;
  const params = [
    body.title,
    body.content,
    body.date,
    "",
    body.title + body.date + body.content,
  ];
  connection.query(sql, params, function (err, rows) {
    if (err) console.log(err);
    console.log(rows);
    res.send("complete");
  });
});

app.get("/calendar/delete/:id", function (req, res) {
  const sql = "DELETE FROM calendar WHERE id = ?";
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) console.log("error");
    console.log(result);
    res.redirect("/calendar");
  });
});

app.get("/calendar/update/:id", function (req, res) {
  const sql = `UPDATE calendar SET title="?", content="?", date="?" participant="?" WHERE id=?`;
  const id = req.params.id;
  const params = ["calendar3", "content3", "2022-02-22", "participants", id];

  connection.query(sql, params, function (err, rows, fields) {
    if (err) console.log("error");
    console.log(rows);
    res.redirect("/calendar");
  });
});

app.get("/alarm", function (req, res) {
  connection.query("SELECT * from alarm", (err, rows) => {
    if (err) console.log(err);
    console.log("Alarm info is:", rows);
    res.send(rows);
  });
});

app.get("/alarm/insert", function (req, res) {
  const sql = `INSERT INTO alarm (accept, payment, schedule) VALUES(?, ?, ?)`;
  const params = ["accept2", "payment2", "schedule2"];
  connection.query(sql, params, function (err, rows, fields) {
    if (err) console.log(err);
    console.log(rows);
    res.redirect("/alarm");
  });
});

app.get("/alarm/delete/:before", function (req, res) {
  const sql = "DELETE FROM alarm WHERE before = ?";
  connection.query(sql, [req.params.before], function (err, result, fields) {
    if (err) console.log(err);
    console.log(result);
    res.redirect("/alarm");
  });
});

app.get("/alarm/update/:before", function (req, res) {
  const sql = `UPDATE alarm SET accept="?", payment="?", schedule="?" WHERE before=?`;
  const before = req.params.before;
  const params = ["alarm3", "payment3", "shcedule3", before];

  connection.query(sql, params, function (err, rows, fields) {
    if (err) console.log(err);
    console.log(rows);
    res.redirect("/alarm");
  });
});

app.get("/schedule", function (req, res) {
  connection.query("SELECT * from schedule", (err, rows) => {
    if (err) console.log(err);
    console.log("Schedule info is:", rows);
    res.send(rows);
  });
});

app.get("/schedule/insert", function (req, res) {
  const sql = `INSERT INTO schedule (title, content, date) VALUES(?, ?, ?)`;
  const params = ["title2", "content2", "2022-06-05"];
  connection.query(sql, params, function (err, rows, fields) {
    if (err) console.log(err);
    console.log(rows);
    res.redirect("/schedule");
  });
});

app.get("/schedule/delete/:id", function (req, res) {
  const sql = "DELETE FROM schedule WHERE id = ?";
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) console.log(err);
    console.log(result);
    res.redirect("/schedule");
  });
});

app.get("/schedule/update/:id", function (req, res) {
  const sql = `UPDATE schedule SET title="?", content="?", date="?" WHERE id=?`;
  const id = req.params.id;
  const params = ["schedule3", "content3", "2022-02-22", id];

  connection.query(sql, params, function (err, rows, fields) {
    if (err) console.log(err);
    console.log(rows);
    res.redirect("/schedule");
  });
});

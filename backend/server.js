const pg = require("pg");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ error: "Error hashing password" });
    }
    const sql =
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *";
    const values = [req.body.name, hash, req.body.email.toLowerCase()];
    pool
      .query(sql, values)
      .then((data) => {
        res.json({ data: data.rows[0] });
      })
      .catch((err) => {
        if (err.constraint === "users_email_key") {
          res.status(400).json({ error: "Email already exists" });
        } else {
          res.status(700).json({ error: "Server error" });
        }
      });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT id, * FROM users WHERE username = $1 OR email = $1"; // Include id in the SELECT statement
  const values = [req.body.name];
  pool
    .query(sql, values)
    .then((data) => {
      if (data.rows.length > 0) {
        const user = data.rows[0];
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            res.json({ data: { id: user.id } }); // Return the ID only in the response
          } else {
            res.status(401).json({ error: "Invalid password" });
          }
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});

app.post("/createsurvey", (req, res) => {
  const { title, description, userId, questions, start_date, end_date } =
    req.body;
  const sqlPoll =
    "INSERT INTO Polls (title, description, user_id, start_date, end_date) VALUES ($1, $2, $3 ,$4 ,$5) RETURNING *";
  const valuesPoll = [title, description, userId, start_date, end_date];

  pool.query(sqlPoll, valuesPoll).then((data) => {
    const pollId = data.rows[0].id;
    Promise.all(
      questions.map((question) => {
        const sqlQuestion =
          "INSERT INTO Questions (question_text, question_type, poll_id) VALUES ($1, $2, $3) RETURNING *";
        // use question.value and question.type instead of question.text and question.type
        const valuesQuestion = [question.value, question.type, pollId];
        return pool.query(sqlQuestion, valuesQuestion);
      })
    )
      .then((questionsData) => {
        Promise.all(
          questionsData.map((questionData, i) => {
            const questionId = questionData.rows[0].id;
            if (questions[i].type === "radio") {
              // return the Promise from the map function
              return Promise.all(
                questions[i].options.map((option) => {
                  const sqlAnswer =
                    "INSERT INTO Answers (answer_text, question_id) VALUES ($1, $2)";
                  // use option.value instead of option
                  const valuesAnswer = [option.value, questionId];
                  return pool.query(sqlAnswer, valuesAnswer);
                })
              ).catch((err) => res.status(500).json({ error: err.message }));
            }
          })
        )
          .then(() => {
            res.status(200).json({ message: "Survey saved successfully." });
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });
});

app.get("/getPolls/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM Polls WHERE user_id = $1 ORDER BY created_at DESC";
  const values = [userId];

  pool
    .query(sql, values)
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

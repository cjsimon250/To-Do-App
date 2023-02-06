const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = require("../modules/pool");

//gets all tasks from the database
router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "to_do_table" ORDER BY "id";';
  pool
    .query(queryText)
    .then((result) => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting tasks", error);
      res.sendStatus(500);
    });
});

//adds new task to database
router.post("/", (req, res) => {
  let newTask = req.body;
  console.log(`adding task`, newTask);

  let queryText = `INSERT INTO "to_do_table" ("task", "completed", "timeCreated")
                     VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [newTask.task, newTask.completed, newTask.timeCreated])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

module.exports = router;

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

  let queryText = `INSERT INTO "to_do_table" 
  ("task", "completed", "timeCreated", "color1", "color2", "color3")
                     VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [
      newTask.task,
      newTask.completed,
      newTask.timeCreated,
      newTask.color1,
      newTask.color2,
      newTask.color3,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

//deletes task from the database
router.delete("/:id", (req, res) => {
  const queryText = `
      DELETE FROM "to_do_table"
      WHERE id = $1;
      `;
  const queryParams = [req.params.id];

  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("DELETE /to_do_table/:id failed", err);
      res.sendStatus(500);
    });
});

//updates task in the database
router.put("/:id", (req, res) => {
  const queryText = `UPDATE "to_do_table" 
      SET "completed"=$1,"timeCreated" = $2
      WHERE "id"=$3;`;

  const queryParams = [req.body.completed, req.body.timeCreated, req.params.id];

  pool
    .query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("sending 500");
      console.log(`PUT Error making query: ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;

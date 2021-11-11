const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET query for list of genres from genres table
router.get("/", (req, res) => {
    const query = `SELECT * FROM "genres" ORDER BY "name" ASC`;
    pool
        .query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log("ERROR: Get all genres", err);
            res.sendStatus(500);
        });
});

// POST query for adding genre (admin)
router.post('/', (req, res) => {
    console.log("POST", req.body);
    const query = `INSERT INTO "genres" ("name") VALUES ($1);`;
    pool
        .query(query, [req.body.genre])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("ERROR: POST genre", err);
            res.sendStatus(500);
        });
})

// DELETE query for removing a genre (admin)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const query = `DELETE FROM "genres" WHERE "id" = $1;`;
    pool.query(query, [id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("ERROR: DELETE genre", err);
            res.sendStatus(500);
        });
})

module.exports = router;

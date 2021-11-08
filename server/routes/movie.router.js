const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET all movies
router.get("/", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

// GET genres for a specific movie (/details)
router.get("/:id", (req, res) => {
  // get the movie id from the path param
  const { id } = req.params;
  console.log("id is:", id);
  // access the movie's genres by joining movies and genres tables via movies_genres
  // use JSON_AGG to return an array of genres instead of multiple rows
  // movie title, poster, and description are also being returned
  const query = `
    SELECT "movies"."id", "movies"."title", "movies"."poster", "movies"."description", JSON_AGG("genres"."name") AS "genres" FROM "movies"
    JOIN "movies_genres" ON "movies_genres"."movie_id" = "movies"."id"
    JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
    WHERE "movies"."id" = $1
    GROUP BY "movies"."id", "movies"."title", "movies"."poster", "movies"."description";`;
  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows); // single row
    })
    .catch((err) => {
      console.log("ERROR: Get movie's genres", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" ("title", "poster", "description")
    VALUES ($1, $2, $3)
    RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // for adding multiple genres to a movie (insert multiple rows into movies_genres)
      // we will add on to this
      let insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES`;

      // array to hold variable number of genre_id values from the client (sanitation)
      const genreIdValues = [];

      // build the query string
      for (let i = 0; i < req.body.genres.length; i++) {
        // start at $2 since $1 will be used for createdMovieId
        insertMovieGenreQuery += `
         ($1, (SELECT "id" from "genres" WHERE "name" = $${i + 2}))`;
        // add a comma or semi-colon depending on if we are at the last interation or not
        if (i === req.body.genres.length - 1) {
          // if last iteration, add semicolon
          insertMovieGenreQuery += `;`;
        } else {
          // otherwise, add comma
          insertMovieGenreQuery += `,`;
        }
        // push the corresponding genre_id value from the client into the sanitation array
        genreIdValues.push(req.body.genres[i]);
      }
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, ...genreIdValues])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// DELETE REQUEST for removing one or more genre relations
// when the client wants to update a movie's genres, all genre relations for that movie will be removed
router.delete("/genres/:id", (req, res) => {
  console.log("in delete", req.body);
  // get the movie id from the path param
  const { id } = req.params;

  const deleteMovieGenresQuery = `DELETE FROM "movies_genres" WHERE "movie_id" = $1;`;

  pool
    .query(deleteMovieGenresQuery, [id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// PUT request to update a movie
router.put("/:id", (req, res) => {
  console.log(req.body);
  // get the movie id from the path param
  const { id } = req.params;

  const updateMovieQuery = `UPDATE "movies" SET "title" = $2, "description" = $3 WHERE "id" = $1;`;

  pool
    .query(updateMovieQuery, [id, req.body.title, req.body.description])
    .then((result) => {
      // after movies table is updated, update movies_genres if needed
      if (req.body.genreFlag) {
        // for adding multiple genres to a movie (insert multiple rows into movies_genres)
        // we will add on to this
        let insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES`;

        // array to hold variable number of genre_id values from the client (sanitation)
        const genreIdValues = [];

        // build the query string
        for (let i = 0; i < req.body.genres.length; i++) {
          // start at $2 since $1 will be used for id
          insertMovieGenreQuery += `
         ($1, (SELECT "id" from "genres" WHERE "name" = $${i + 2}))`;
          // add a comma or semi-colon depending on if we are at the last interation or not
          if (i === req.body.genres.length - 1) {
            // if last iteration, add semicolon
            insertMovieGenreQuery += `;`;
          } else {
            // otherwise, add comma
            insertMovieGenreQuery += `,`;
          }
          // push the corresponding genre_id value from the client into the sanitation array
          genreIdValues.push(req.body.genres[i]);
        }
        // SECOND QUERY ADDS GENRE(S) TO THE EXISTING MOVIE
        pool
          .query(insertMovieGenreQuery, [id, ...genreIdValues])
          .then((result) => {
            //Now that both are done, send back success!
            res.sendStatus(201);
          })
          .catch((err) => {
            // catch for second query
            console.log(err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    }); // first query catch
});

module.exports = router;

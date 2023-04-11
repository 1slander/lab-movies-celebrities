// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movie.model");

// all your routes here

router.get("/movies/create", (req, res) => {
  res.render();
});
router.post("/movies/create", (req, res) => {
  res.render();
});

module.exports = router;

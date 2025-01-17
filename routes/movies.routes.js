// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here

router.get("/create", async (req, res) => {
  try {
    const celebsList = await CelebrityModel.find();
    console.log("This are the list of celebrities for movies:", celebsList);
    res.render("movies/new-movie.hbs", { celebsList });
  } catch (err) {
    console.log(err);
  }
});
router.post("/create", async (req, res) => {
  try {
    const newMovie = await MovieModel.create(req.body);
    console.log("New movie added:", newMovie);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});
//Display Movies
router.get("/", async (req, res) => {
  const allMovies = await MovieModel.find();
  console.log("Movies list:", allMovies);
  res.render("movies/movies.hbs", { allMovies });
});

//Display Movie info + Cast
router.get("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const findMovie = await MovieModel.findById(movieId).populate("cast");
    console.log(findMovie);
    res.render("movies/movie-details.hbs", { findMovie });
  } catch (err) {
    console.log(err);
  }
});

//Deleting
router.post("/:movieId/delete", async (req, res) => {
  try {
    const { movieId } = req.params;
    const deleteMovie = await MovieModel.findByIdAndDelete(movieId);
    console.log("The deleted movies is:", deleteMovie);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

//Update

router.get("/:movieId/edit", async (req, res) => {
  try {
    const { movieId } = req.params;
    const editMovie = await MovieModel.findById(movieId);
    const allCelebrities = await CelebrityModel.find().populate();
    console.log(editMovie, allCelebrities);
    res.render("movies/edit-movie", {
      editMovie,
      allCelebrities,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:movieId/edit", async (req, res) => {
  try {
    const { movieId } = req.params;
    const newMovieInfo = req.body;
    const updateMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      newMovieInfo
    );
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

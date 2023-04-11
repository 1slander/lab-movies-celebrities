// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");
// all your routes here
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", async (req, res) => {
  try {
    const newCelebrity = await CelebrityModel.create(req.body);
    console.log("Celebrity created:", newCelebrity);
    res.redirect("/celebrities");
  } catch (err) {
    console.log("Celebrity couldn't be added:", err);
    res.redirect("celebrities/new-celebrity.hbs");
  }
});

router.get("/", async (req, res) => {
  try {
    const allCelebrities = await CelebrityModel.find();
    console.log("Celebrities list:", allCelebrities);
    res.render("celebrities/celebrities.hbs", { allCelebrities });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

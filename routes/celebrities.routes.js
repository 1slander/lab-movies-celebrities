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

router.get("/:celebId", async (req, res) => {
  try {
    const { celebId } = req.params;
    const findCeleb = await CelebrityModel.findById(celebId);
    console.log(findCeleb);
    res.render("celebrities/celebrity-details.hbs", { findCeleb });
  } catch (err) {
    console.log(err);
  }
});

//Deleting
router.post("/:celebId/delete", async (req, res) => {
  try {
    const { celebId } = req.params;
    const deleteCeleb = await CelebrityModel.findByIdAndDelete(celebId);
    console.log("The deleted celebrity is:", deleteCeleb);
    res.redirect("/celebrities");
  } catch (err) {
    console.log(err);
  }
});

//Update

router.get("/:celebId/edit", async (req, res) => {
  try {
    const { celebId } = req.params;
    const editCeleb = await CelebrityModel.findById(celebId);

    res.render("celebrities/edit-celebrity.hbs", {
      editCeleb,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:celebId/edit", async (req, res) => {
  try {
    const { celebId } = req.params;
    const newCelebInfo = req.body;
    const updateCeleb = await CelebrityModel.findByIdAndUpdate(
      celebId,
      newCelebInfo
    );
    res.redirect("/celebrities");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// "/api/campuses"
const campusRouter = require("express").Router();
const { Campus } = require("../db");

campusRouter.get("/", async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.send(allCampuses);
  } catch (error) {
    next(error);
  }
});

campusRouter.get("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      throw new Error(`Cannot GET /api/campuses/${req.params.id}:
        Not a valid campus ID`);
    }
    res.send(campus);
  } catch (error) {
    next(error.message);
  }
});

module.exports = campusRouter;

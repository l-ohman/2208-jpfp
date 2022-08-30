// "/api/campuses"
const campusRouter = require("express").Router();
const { Campus, Student } = require("../db");

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
    const campus = await Campus.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Student,
      },
    });
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

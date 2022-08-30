// "/api/campuses"
const router = require("express").Router();
const { Campus, Student } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.send(allCampuses);
  } catch (error) {
    next(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Student,
      },
    });

    res.send(campus);
  } catch (error) {
    next(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Campus.create(req.body)
    res.redirect(`/${req.body.id}`);
  } catch (error) {
    next(error.message);
  }
})

// router.put();
// router.delete();

module.exports = router;

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
    res.status(200).send(await Campus.create(req.body));
  } catch (error) {
    next(error.message);
  }
});

// router.put();

router.delete("/:id", async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(200);
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;

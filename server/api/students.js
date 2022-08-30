// "/api/students"
const router = require("express").Router();
const { Campus, Student } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.send(allStudents);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Campus,
      },
    });

    res.send(student);
  } catch (error) {
    next(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body))
  } catch (error) {
    next(error.message);
  }
})

// router.put();
// router.delete();

module.exports = router;

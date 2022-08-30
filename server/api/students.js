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
    res.status(201).send(await Student.create(req.body));
  } catch (error) {
    next(error.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const studentToUpdate = await Student.findByPk(req.params.id);
    res.send(await studentToUpdate.update(req.body));
  } catch (error) {
    next(error.message);
  }  
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Student.destroy({
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

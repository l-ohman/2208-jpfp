// "/api/students"
const studentRouter = require("express").Router();
const { Campus, Student } = require("../db");

studentRouter.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.send(allStudents);
  } catch (error) {
    next(error);
  }
});

studentRouter.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Campus,
      },
    });
    if (!student) {
      throw new Error(`Cannot GET /api/students/${req.params.id}:
          Not a valid student ID`);
    }
    res.send(student);
  } catch (error) {
    next(error.message);
  }
});

module.exports = studentRouter;

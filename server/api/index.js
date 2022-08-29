const router = require('express').Router();

// "/api"
router.use("/campuses", require("./campuses"));
router.use("/students", require("./students"));

module.exports = router;

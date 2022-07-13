const { Router } = require("express");
const router = Router();

router.use("/movies", require("./movies"));

module.exports = router;



const express = require("express");
const router = express.Router();
// Import controller
const categoryControllers = require("../controllers/category-controller");
const { authCheck } = require("../middlewares/auth-middleware");
// @ENDPOINT http://localhost:6778/api/category
router.post("/category",authCheck, categoryControllers.createcategory);
// router.patch("/menu/:id", authCheck, menuControllers.updatemenu);
router.get("/allcat/:user_id", authCheck, categoryControllers.findAllCategoriesByUserId);
// router.get("/menu/:findOne", authCheck, menuControllers.findOne);

module.exports = router;

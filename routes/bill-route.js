const express = require("express");
const router = express.Router();

// Import controller
const billControllers = require("../controllers/bill-controller");
const { authCheck } = require("../middlewares/auth-middleware");

// @ENDPOINT http://localhost:6778/api/bill

// ✅ สร้างบิล
router.post("/bill", billControllers.createBill);

// ✅ ดึงบิลทั้งหมด
router.get("/bill", billControllers.getBills);

// ✅ (ถ้ามีในอนาคต) อัปเดตบิล
// router.patch("/bill/:id", authCheck, billControllers.updateBill);

// ✅ (ถ้ามีในอนาคต) ลบบิล
// router.delete("/bill/:id", authCheck, billControllers.deleteBill);

module.exports = router;

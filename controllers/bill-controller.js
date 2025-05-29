const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const toThaiTimeZone = require("../utils/toThaiTimeFormatted");

exports.createBill = async (req, res, next) => {
  try {
    // Step 1: รับข้อมูลจาก req.body
    const {
      total,
      drawer_id,
      items
    } = req.body;

    // Step 2: ตรวจสอบข้อมูลที่จำเป็น
    if (
      total === undefined ||
      drawer_id === undefined ||
      !Array.isArray(items)
    ) {
      return res.status(400).json({ message: "Invalid or missing fields" });
    }

    // Step 3: สร้างบิลในฐานข้อมูล
    const bill = await prisma.bill.create({
      data: {
        total,
        drawer_id,
        items
      }
    });

    // Step 4: ตอบกลับ
    res.json({
      message: "Bill created successfully",
      bill: {
        ...bill,
        createdAt: toThaiTimeZone(bill.createdAt),
        updatedAt: toThaiTimeZone(bill.updatedAt)
      }
    });
  } catch (error) {
    console.log("Error in creating bill:", error);
    next(error);
  }
};


exports.getBills = async (req, res, next) => {
  try {
    // Step 1: Get all bills
    const bills = await prisma.bill.findMany();

    // Step 2: Format time to Thai timezone
    const formattedBills = bills.map((bill) => ({
      ...bill,
      createdAt: toThaiTimeZone(bill.createdAt),
      updatedAt: toThaiTimeZone(bill.updatedAt),
    }));

    // Step 3: Sum total
    const totalAmount = bills.reduce((sum, bill) => sum + bill.total, 0);

    // Step 4: Response
    res.json({
      message: "Bills retrieved successfully",
      totalAmount, // <-- รวมยอด total
      bills: formattedBills,
    });
  } catch (error) {
    console.log("Error in getting bills:", error);
    next(error);
  }
};



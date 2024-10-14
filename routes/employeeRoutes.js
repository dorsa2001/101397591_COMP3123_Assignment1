const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Employee Creation Route with Validation
router.post(
  "/employees",
  [
    check("first_name").notEmpty().withMessage("First name is required"),
    check("last_name").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("position").notEmpty().withMessage("Position is required"),
    check("salary").isNumeric().withMessage("Salary must be a number"),
    check("date_of_joining").isISO8601().withMessage("Valid date is required"),
    check("department").notEmpty().withMessage("Department is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
  },
  createEmployee
);

// Additional validation for updateEmployee as needed
router.put(
  "/employees/:id",
  [
    check("salary")
      .optional()
      .isNumeric()
      .withMessage("Salary must be a number"),
    check("date_of_joining")
      .optional()
      .isISO8601()
      .withMessage("Valid date is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
  },
  updateEmployee
);

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;

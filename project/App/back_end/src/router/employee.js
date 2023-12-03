const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const EmployeeSchema = require("../../model/EmployeeSchema");
const Employee = require("../../model/Employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

// @route   GET employee/
// @desc    gets all user created employees
// @access  private
router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.find({
      createdBy: new ObjectId(req.user),
    });

    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// @route   GET employee/:id
// @desc    gets all employee
// @access  private
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findOne({ _id: new ObjectId(id) });

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// @route   POST employee/create
// @desc    creates a new employee
// @access  private
router.post("/", auth, async (req, res) => {
  const body = req.body;

  const safeSchema = EmployeeSchema.safeParse(body);
  if (!safeSchema.success) {
    const errors = safeSchema.error.issues.map((i) => i.message)[0];
    return res.status(400).json({ message: "Validation failed.", errors });
  }
  const { email, firstName, lastName } = safeSchema.data;

  try {
    const createdEmployee = await Employee.create({
      email,
      firstName,
      lastName,
      createdBy: new ObjectId(req.user),
    });

    return res.status(200).json(createdEmployee._doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// @route   PUT employee/:id
// @desc    updates an employee
// @access  private
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const safeSchema = EmployeeSchema.safeParse(body);
  if (!safeSchema.success) {
    const errors = safeSchema.error.issues.map((i) => i.message)[0];
    return res.status(400).json({ message: "Validation failed.", errors });
  }
  const { email, firstName, lastName } = safeSchema.data;

  try {
    const updatedEmployee = await Employee.updateOne(
      { _id: new ObjectId(id) },
      {
        email,
        firstName,
        lastName,
        createdBy: new ObjectId(req.user),
      }
    );

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// @route   DELETE employee/:id
// @desc    deletes an employee
// @access  private
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEmployee = await Employee.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json(deletedEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;

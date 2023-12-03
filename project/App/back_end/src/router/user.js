const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { UserSchema, LoginSchema } = require("../../model/UserSchema");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

// @route   POST user/register
// @desc    registers a new user
// @access  public
router.post("/register", async (req, res) => {
  const body = req.body;

  const safeSchema = UserSchema.safeParse(body);
  if (!safeSchema.success) {
    const errors = safeSchema.error.issues.map((i) => i.message)[0];
    return res.status(400).json({ message: "Validation failed.", errors });
  }
  let { email, firstName, lastName, password } = safeSchema.data;

  //salting and hashing
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  try {
    const createdUser = await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    //gen payload
    const payload = {
      user: {
        id: createdUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        const { password, ...user } = { ...createdUser._doc };
        return res.status(200).json({ ...user, token });
      }
    );
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ type: "email-exists", msg: "This email already exists." });
    }
    res.status(500).json({ message: "server error" });
  }
});

// @route   POST user/login
// @desc    logs in a user
// @access  public
router.post("/login", async (req, res) => {
  const body = req.body;

  const safeSchema = LoginSchema.safeParse(body);
  if (!safeSchema.success) {
    const errors = safeSchema.error.issues.map((i) => i.message)[0];
    return res.status(400).json({ message: "Validation failed.", errors });
  }
  let { email, password } = safeSchema.data;

  try {
    const savedUser = await User.findOne({ email });

    if (!savedUser) {
      return res
        .status(400)
        .json({ type: "invalid", msg: "Invalid Credentials, Try again" });
    }

    const isMatch = await bcrypt.compare(password, savedUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ type: "invalid", msg: "Invalid Credentials" });
    }

    //gen payload
    const payload = {
      user: {
        id: savedUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        const { password, ...user } = { ...savedUser._doc };
        return res.status(200).json({ ...user, token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// @route   GET user/whoami
// @desc    returns user based on token
// @access  private
router.get("/whoami", auth, async (req, res) => {
  const userId = req.user;
  try {
    const savedUser = await User.findById(new ObjectId(userId));
    return res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;

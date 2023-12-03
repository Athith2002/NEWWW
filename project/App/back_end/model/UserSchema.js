const { z } = require("zod");

const UserSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required." })
    .trim()
    .min(3, "First name must be atleast 3 characters long."),
  lastName: z
    .string({ required_error: "Last name is required." })
    .trim()
    .min(3, "Last name must be atleast 3 characters long."),
  email: z.string({ required_error: "Email is required." }).trim().email(),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must be atleast 8 characters long.")
    .max(30, "Make your password small.")
    .regex(/[A-Z]+.*/, "Include atleast one capital letter.")
    .regex(
      /.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]+.*/,
      "Include atleast one special character."
    ),
});

const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required." }).trim().email(),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must be atleast 8 characters long.")
    .max(30, "Make your password small."),
});

module.exports = { UserSchema, LoginSchema };

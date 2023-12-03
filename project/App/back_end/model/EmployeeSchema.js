const { z } = require("zod");

const EmployeeSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required." })
    .trim()
    .min(3, "First name must be atleast 3 characters long."),
  lastName: z
    .string({ required_error: "Last name is required." })
    .trim()
    .min(3, "Last name must be atleast 3 characters long."),
  email: z.string({ required_error: "Email is required." }).trim().email(),
});

module.exports = EmployeeSchema;

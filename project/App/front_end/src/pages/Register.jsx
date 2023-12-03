import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/Button";
import Input from "../components/form-elements/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useAuthStore from "../store/authStore";

const RegisterSchema = z
  .object({
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
        "Include atleast one special character.",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters long.")
      .max(30, "Make your password small.")
      .regex(/[A-Z]+.*/, "Include atleast one capital letter.")
      .regex(
        /.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]+.*/,
        "Include atleast one special character.",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(RegisterSchema),
  });

  const { register: registerUser } = useAuth();
  const { emailPaswordLoading } = useAuthStore();

  const navigate = useNavigate();

  return (
    <section className="h-[100dvh]">
      <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
        <div className="relative flex h-full w-[50%] grow flex-col overflow-y-auto overflow-x-hidden px-3 md:px-0">
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="aspect-square rounded-full bg-gray-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-skin-primary"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z"
                    opacity=".5"
                  />
                  <path
                    fill="currentColor"
                    d="M14 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2"
                  />
                </svg>
              </div>
              <h1 className="mt-5 text-2xl">
                Register to Employee Management System
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                COMP 3123 Full Stack Development – I
              </p>

              <form
                onSubmit={handleSubmit(async (values) => {
                  const { confirmPassword, ...payload } = values;
                  try {
                    await registerUser(payload);
                  } catch (error) {}
                })}
                className="mt-10 w-full max-w-xl"
              >
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="First name"
                    placeholder="Enter first name"
                    {...register("firstName")}
                    error={errors.firstName && errors.firstName.message}
                  />
                  <Input
                    label="Last name"
                    placeholder="Enter last name"
                    {...register("lastName")}
                    error={errors.lastName && errors.lastName.message}
                  />
                </div>

                <Input
                  className="mt-8"
                  inputClass="pl-10"
                  LeadingIcon={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3 h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14.2 3H9.8C5.652 3 3.577 3 2.289 4.318C1 5.636 1 7.758 1 12c0 4.243 0 6.364 1.289 7.682C3.577 21 5.652 21 9.8 21h4.4c4.148 0 6.223 0 7.511-1.318C23 18.364 23 16.242 23 12c0-4.243 0-6.364-1.289-7.682C20.423 3 18.348 3 14.2 3"
                        opacity=".5"
                      />
                      <path
                        fill="currentColor"
                        d="M19.128 8.033a.825.825 0 0 0-1.056-1.268l-2.375 1.98c-1.026.855-1.738 1.447-2.34 1.833c-.582.375-.977.5-1.357.5s-.774-.125-1.357-.5c-.601-.386-1.314-.978-2.34-1.834L5.928 6.765a.825.825 0 0 0-1.056 1.268l2.416 2.014c.975.812 1.765 1.47 2.463 1.92c.726.466 1.434.762 2.25.762c.814 0 1.522-.296 2.249-.763c.697-.448 1.487-1.107 2.462-1.92l2.416-2.013"
                      />
                    </svg>
                  )}
                  placeholder="Enter email"
                  type="email"
                  {...register("email")}
                  error={errors.email && errors.email.message}
                />
                <div className="mt-8 grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    inputClass="pl-10"
                    LeadingIcon={() => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16"
                          opacity=".5"
                        />
                        <path
                          fill="currentColor"
                          d="M12.75 14a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zm-6-6a5.25 5.25 0 0 1 10.5 0v2.004c.567.005 1.064.018 1.5.05V8a6.75 6.75 0 0 0-13.5 0v2.055a23.57 23.57 0 0 1 1.5-.051z"
                        />
                      </svg>
                    )}
                    placeholder="Enter password"
                    type="password"
                    {...register("password")}
                    error={errors.password && errors.password.message}
                  />
                  <Input
                    inputClass="pl-10"
                    LeadingIcon={() => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16"
                          opacity=".5"
                        />
                        <path
                          fill="currentColor"
                          d="M12.75 14a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zm-6-6a5.25 5.25 0 0 1 10.5 0v2.004c.567.005 1.064.018 1.5.05V8a6.75 6.75 0 0 0-13.5 0v2.055a23.57 23.57 0 0 1 1.5-.051z"
                        />
                      </svg>
                    )}
                    placeholder="Confirm password"
                    type="password"
                    {...register("confirmPassword")}
                    error={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                  />
                </div>
                <Button
                  isSpinning={emailPaswordLoading}
                  type="submit"
                  wrapperClass="mt-10 w-full max-w-xs mx-auto"
                  className={"flex w-full items-center justify-center"}
                >
                  Take me in
                </Button>
                <p className="mt-1 text-center text-xs text-gray-500">
                  Already have an account?{" "}
                  <Link
                    className="text-blue-600 hover:underline"
                    to={"/user/login"}
                  >
                    login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useEditEmployee from "../../api/employee/useEditEmployee";
import useGetEmployee from "../../api/employee/useGetEmployee";
import { Button } from "../../components/Button";
import Input from "../../components/form-elements/Input";

const EditEmployeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be atleast 3 characters long."),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be atleast 3 characters long."),
  email: z.string().trim().email(),
});

const EditEmployee = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(EditEmployeeSchema),
  });

  const { mutateAsync: editEmployee, isLoading: isEmployeeLoading } =
    useEditEmployee();

  const { id } = useParams();

  const { data: employee, isLoading } = useGetEmployee(id || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      setValue("email", employee.email);
      setValue("firstName", employee.firstName);
      setValue("lastName", employee.lastName);
    }
  }, [employee]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="mt-5 text-2xl">Edit Employee</h1>
      <p className="mt-1 text-sm text-gray-600">
        COMP 3123 Full Stack Development – I
      </p>

      {!isLoading && (
        <form
          onSubmit={handleSubmit(async (values) => {
            await editEmployee({ id: id || "", ...values });
            navigate("/employee");
          })}
          className="mt-10 w-full max-w-lg"
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
            inputClass="mt-8 pl-10"
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

          <Button
            isSpinning={isEmployeeLoading}
            type="submit"
            wrapperClass="mt-10 w-full mx-auto max-w-xs"
            className={"flex w-full items-center justify-center"}
          >
            Save changes
          </Button>
        </form>
      )}
    </div>
  );
};

export default EditEmployee;

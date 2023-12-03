import { useParams } from "react-router-dom";
import useGetEmployee from "../../api/employee/useGetEmployee";
import Spinner from "../../components/Spinner";

const EmployeeDetail = () => {
  const { id } = useParams();

  const { data: employee, isLoading } = useGetEmployee(id || "");
  return (
    <>
      {!isLoading && employee && (
        <div className="rounded-xl border p-5">
          <div className="flex items-start justify-start gap-3">
            <div className="rounded-xl bg-skin-primary/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-skin-primary"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="6" r="4" fill="currentColor" />
                <path
                  fill="currentColor"
                  d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                  opacity=".5"
                />
              </svg>
            </div>
            <div className="">
              <h3 className="text-base font-medium text-gray-800">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-xs text-gray-600">{employee.email}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="text-gray-800" size={"sm"} />
        </div>
      )}
    </>
  );
};

export default EmployeeDetail;

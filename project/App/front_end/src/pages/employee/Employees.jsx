import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDeleteEmployee from "../../api/employee/useDeleteEmployee";
import useGetEmployees from "../../api/employee/useGetEmployees";
import { BasicButton, Button } from "../../components/Button";
import Menu, { MenuItem } from "../../components/Menu";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";

const EmployeeMenu = ({ id, refetch }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Menu
      Contents={({ closeMenu }) => (
        <>
          <div className="px-5 pb-2 pt-5">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              Edit
            </h3>
            <MenuItem
              onSelect={() => {
                navigate(`/employee/edit/${id}`);
              }}
              className="-mx-3 px-3 py-3"
              closeMenu={closeMenu}
            >
              Edit
            </MenuItem>

            <MenuItem
              onSelect={() => {
                navigate(`/employee/view/${id}`);
              }}
              className="-mx-3 px-3 py-3"
              closeMenu={closeMenu}
            >
              View
            </MenuItem>

            <div className="my-2 flex items-center justify-start gap-2">
              <p className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-500">
                Danger zone
              </p>
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <MenuItem
              className="-mx-3 flex items-center gap-2 px-3 py-3 data-[highlighted]:bg-red-700"
              onSelect={() => {
                navigate(`?delete=true&id=${id}`);
              }}
              closeMenu={closeMenu}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z" />
                    <path
                      fillRule="evenodd"
                      d="M9.425 11.482c.413-.044.78.273.821.707l.5 5.263c.041.433-.26.82-.671.864c-.412.043-.78-.273-.821-.707l-.5-5.263c-.041-.434.26-.821.671-.864Zm5.15 0c.412.043.713.43.671.864l-.5 5.263c-.04.434-.408.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.041-.433.409-.75.82-.707Z"
                      clipRule="evenodd"
                    />
                    <path
                      d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Z"
                      opacity=".5"
                    />
                  </g>
                </svg>
              </span>
              Delete
            </MenuItem>
          </div>
        </>
      )}
      open={open}
      setOpen={setOpen}
    >
      <BasicButton
        variant={"ghost"}
        onClick={() => setOpen((pv) => !pv)}
        wrapperClass="w-min flex"
        className="flex items-center justify-center rounded bg-transparent p-0 font-medium text-blue-500 focus-within:outline-none hover:bg-transparent hover:underline data-[focus-visible]:border-none data-[pressed]:bg-transparent data-[focus-visible]:text-blue-400 data-[focus-visible]:underline data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-500 data-[focus-visible]:ring-offset-4 data-[focus-visible]:ring-offset-skin-primary md:p-0"
      >
        Options
      </BasicButton>
    </Menu>
  );
};

const Employees = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  const {
    data: employees,
    isLoading: isEmployeeLoading,
    refetch,
  } = useGetEmployees();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-2xl items-start justify-between gap-10">
        <div className="">
          <h1 className="text-2xl">Employees</h1>
          <p className="mt-1 text-sm text-gray-600">
            COMP 3123 Full Stack Development – I
          </p>
        </div>

        <Button
          className={
            "flex w-full items-center justify-center whitespace-nowrap"
          }
          onClick={() => navigate("/employee/create")}
        >
          Add Employee
        </Button>
      </div>

      {employees && !isEmployeeLoading && (
        <div className="mt-10 w-full max-w-2xl">
          <Table
            key={employees}
            headings={["First Name", "Last Name", "Email", "_option"]}
            datas={employees.map((emp) => {
              const row = [];

              row.push(<div key={emp._id}>{emp.firstName}</div>);
              row.push(<div key={emp._id}>{emp.lastName}</div>);
              row.push(<div key={emp._id}>{emp.email}</div>);
              row.push(<EmployeeMenu id={emp._id} refetch={refetch} />);
              return row;
            })}
            className={`max-h-[30rem] rounded-xl border-t-0 shadow-none transition-all duration-100`}
            tableHeadClass={`bg-gray-800 text-white border-t-0 `}
          ></Table>

          <Modal
            className="max-w-lg p-0 sm:p-0"
            open={!!searchParams.get("delete")}
            onOpenChange={(val) => {
              if (val) {
                setSearchParams((pv) => {
                  pv.set("delete", "true");
                  return pv;
                });
              } else {
                setSearchParams((pv) => {
                  pv.delete("delete");
                  pv.delete("id");
                  return pv;
                });
              }
            }}
          >
            <div className="p-5 sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z" />
                    <path
                      fillRule="evenodd"
                      d="M9.425 11.482c.413-.044.78.273.821.707l.5 5.263c.041.433-.26.82-.671.864c-.412.043-.78-.273-.821-.707l-.5-5.263c-.041-.434.26-.821.671-.864Zm5.15 0c.412.043.713.43.671.864l-.5 5.263c-.04.434-.408.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.041-.433.409-.75.82-.707Z"
                      clipRule="evenodd"
                    />
                    <path
                      d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Z"
                      opacity=".5"
                    />
                  </g>
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Modal.Title className="text-base font-semibold leading-6 text-gray-900">
                  Are you sure you want to delete?
                </Modal.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This process is irrevisible, please make sure before you
                    proceed.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 w-full gap-3 px-5 pb-5 sm:mt-4 sm:flex sm:w-auto sm:flex-row-reverse">
              <Button
                isSpinning={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  await deleteEmployee(searchParams.get("id") || "");
                  await refetch();
                  setIsLoading(false);
                  setSearchParams((pv) => {
                    pv.delete("delete");
                    return pv;
                  });
                }}
                variant={"danger"}
                wrapperClass="w-full sm:w-min"
                className={"flex w-full items-center justify-center sm:w-auto"}
              >
                Yes
              </Button>

              <Button
                variant={"secondary"}
                wrapperClass="w-full sm:w-min"
                className={
                  "mt-3 flex w-full items-center justify-center sm:mt-0 sm:w-auto"
                }
                onClick={() =>
                  setSearchParams((pv) => {
                    pv.delete("delete");
                    pv.delete("id");
                    return pv;
                  })
                }
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      )}

      {isEmployeeLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="text-gray-800" size={"sm"} />
        </div>
      )}
    </div>
  );
};

export default Employees;

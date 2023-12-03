import { useNavigate } from "react-router-dom";
import { BasicButton } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { user } = useAuthStore();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between border-b px-3 py-2">
      <div className="flex items-center justify-start gap-2">
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

        <p className="text-xl font-medium uppercase tracking-wide text-gray-800">
          Employee Management System
        </p>
      </div>

      {user ? (
        <div className="flex items-center justify-end gap-5">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-800">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-600">{user.email}</div>
          </div>

          <BasicButton
            onClick={() => signOut()}
            variant={"ghost"}
            className={
              "flex items-center justify-center gap-2 bg-skin-primary/10  p-3 text-skin-primary hover:bg-skin-primary/20 data-[pressed]:bg-skin-primary/20 md:p-3"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.052 4.5C9 5.078 9 5.804 9 6.722v10.556c0 .918 0 1.644.052 2.222H8c-2.357 0-3.536 0-4.268-.732C3 18.035 3 16.857 3 14.5v-5c0-2.357 0-3.536.732-4.268C4.464 4.5 5.643 4.5 8 4.5z"
                opacity=".5"
              />
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M9.707 2.409C9 3.036 9 4.183 9 6.476v11.048c0 2.293 0 3.44.707 4.067c.707.627 1.788.439 3.95.062l2.33-.406c2.394-.418 3.591-.627 4.302-1.505c.711-.879.711-2.149.711-4.69V8.948c0-2.54 0-3.81-.71-4.689c-.712-.878-1.91-1.087-4.304-1.504l-2.328-.407c-2.162-.377-3.243-.565-3.95.062m3.043 8.545c0-.434-.336-.785-.75-.785s-.75.351-.75.784v2.094c0 .433.336.784.75.784s.75-.351.75-.784v-2.094"
                clip-rule="evenodd"
              />
            </svg>

            <p>Logout</p>
          </BasicButton>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2">
          <BasicButton onClick={() => navigate("/user/register")}>
            Register
          </BasicButton>
          <BasicButton
            variant={"secondary"}
            onClick={() => navigate("/user/login")}
          >
            Login
          </BasicButton>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

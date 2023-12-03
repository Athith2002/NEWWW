import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import useAuthStore from "../store/authStore";

const Home = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <section className="flex h-[90dvh] w-full flex-col items-center justify-center">
      <h1 className="text-xl font-medium text-gray-800">
        Employee Management System
      </h1>

      {user && (
        <div className="mt-5">
          <Button
            onClick={() => navigate("/employee")}
            className={"flex items-center justify-center whitespace-nowrap"}
          >
            View Employees
          </Button>
        </div>
      )}
    </section>
  );
};

export default Home;

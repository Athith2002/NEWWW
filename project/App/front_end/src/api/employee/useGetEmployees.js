import { useQuery } from "react-query";
import fetcher from "../../utilities/fetcher";

const useGetEmployees = () => {
  return useQuery({
    queryKey: ["use-get-employees"],
    queryFn: async () => {
      const { data } = await fetcher().get("/employee");
      return data;
    },
    retry: 1,
  });
};

export default useGetEmployees;

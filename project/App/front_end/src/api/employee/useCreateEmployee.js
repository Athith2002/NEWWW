import { useMutation } from "react-query";
import fetcher from "../../utilities/fetcher";

const useCreateEmployee = () => {
  return useMutation({
    mutationKey: ["create-employee"],
    mutationFn: async (body) => {
      const { data } = await fetcher().post("/employee", body);
      return data;
    },
  });
};

export default useCreateEmployee;

import { useMutation } from "react-query";
import fetcher from "../../utilities/fetcher";

const useDeleteEmployee = () => {
  return useMutation({
    mutationKey: ["delete-employee"],
    mutationFn: async (id) => {
      const { data } = await fetcher().delete(`/employee/${id}`);
      return data;
    },
  });
};

export default useDeleteEmployee;

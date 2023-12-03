import { useMutation } from "react-query";
import fetcher from "../../utilities/fetcher";

const useEditEmployee = () => {
  return useMutation({
    mutationKey: ["edit-employee"],
    mutationFn: async (body) => {
      const { id, ...payload } = body;
      const { data } = await fetcher().put(`/employee/${id}`, payload);
      return data;
    },
  });
};

export default useEditEmployee;

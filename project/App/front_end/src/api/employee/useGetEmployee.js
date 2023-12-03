import { useQuery } from "react-query";
import fetcher from "../../utilities/fetcher";

const useGetEmployee = (id) => {
  return useQuery({
    queryKey: ["use-get-employee", id],
    queryFn: async () => {
      if (!id) return;
      const { data } = await fetcher().get(`/employee/${id}`);
      return data;
    },
    retry: 1,
  });
};

export default useGetEmployee;

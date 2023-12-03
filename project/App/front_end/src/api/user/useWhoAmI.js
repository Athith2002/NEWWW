import { useMutation } from "react-query";
import fetcher from "../../utilities/fetcher";

const useWhoAmI = () => {
  return useMutation({
    mutationKey: ["who-am-i"],
    mutationFn: async () => {
      const { data } = await fetcher().get("/user/whoami");
      return data;
    },
  });
};

export default useWhoAmI;

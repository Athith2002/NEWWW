import axios from "axios";
import isValid from "./isValid";

export default () => {
  let token = "";
  const unParsedToken = JSON.stringify(
    localStorage.getItem(`${__TOKEN_PREFIX__}_token`),
  );
  if (isValid(unParsedToken)) token = JSON.parse(unParsedToken || " ");

  const axiosClient = axios.create({
    baseURL: __BACKEND_URL__,
    timeout: 10000 * 15,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return axiosClient;
};

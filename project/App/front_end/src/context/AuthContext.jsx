import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import fetcher from "../utilities/fetcher";

const AuthContext = createContext({
  fetchUserPromise: async () => {},
  signIn: (params) => {},
  register: (params) => {},
  signOut: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser, setEmailPasswordLoading } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem(`${__TOKEN_PREFIX__}_token`);
    getCurrentUser(token);
  }, []);

  const getCurrentUser = async (token) => {
    try {
      if (!user) {
        if (token) {
          const { data } = await fetcher().get("user/whoami");
          setUser(data);
        }
      } else {
        return setUser;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (signInParams) => {
    setEmailPasswordLoading(true);
    const url = `${__BACKEND_URL__}/user/login`;
    try {
      const { data: user } = await fetcher().post(url, {
        email: signInParams.email,
        password: signInParams.password,
      });
      setUser(user);
      localStorage.setItem(`${__TOKEN_PREFIX__}_token`, user.token);
    } catch (error) {
      console.log(error);
    } finally {
      setEmailPasswordLoading(false);
    }
  };

  const register = async (registerParams) => {
    setEmailPasswordLoading(true);
    const url = `${__BACKEND_URL__}/user/register`;
    try {
      const { data: user } = await fetcher().post(url, {
        firstName: registerParams.firstName,
        lastName: registerParams.lastName,
        email: registerParams.email,
        password: registerParams.password,
      });
      setUser(user);
      localStorage.setItem(`${__TOKEN_PREFIX__}_token`, user.token);
    } catch (error) {
      console.log(error);
    } finally {
      setEmailPasswordLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(`${__TOKEN_PREFIX__}_token`);
    setUser(null);
  };

  async function fetchUserPromise() {
    return new Promise(async (resolve) => {
      const token = localStorage.getItem(`${__TOKEN_PREFIX__}_token`);
      const user = await getCurrentUser(token);
      resolve(user);
    });
  }

  const value = {
    fetchUserPromise,
    signIn,
    register,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

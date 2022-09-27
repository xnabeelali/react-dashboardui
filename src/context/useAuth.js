import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "../app/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loggedInUserCache = JSON.parse(localStorage.getItem('loggedInUser')) || '';
  const tokenCache = JSON.parse(localStorage.getItem('token')) || '';
  const [token, setToken] = useState(tokenCache);
  const [loggedInUser, setLoggedInUser] = useState(loggedInUserCache);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        setToken(token);
    }
    
  }, [setToken, token]);


  const login = async (data) => {
    try {
        const res = await authUser(data);
        setToken(res.data.access_token);
        setLoggedInUser(res.data);
        if (res.data.user.id === 1) {
            setIsAdmin(true)
        } 
        localStorage.setItem('token', JSON.stringify(res.data.access_token));
        localStorage.setItem('loggedInUser', JSON.stringify(res.data));
        navigate("/dashboard", { replace: true });
    
    } catch (error) {
        console.log(error);
    }
  };
  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    navigate("/");
    localStorage.clear();
    
  };

  const value = useMemo(
    () => ({
        token,
        setToken,
        loggedInUser,
        setLoggedInUser,
        isAdmin,
        setIsAdmin,
        login,
        logout
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

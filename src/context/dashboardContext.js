import { createContext, useState } from "react";

export const userDash = createContext();

const DashboardContext = ({ children }) => {
    const [theme, setTheme] = useState(false);
    const [users, setUsers] = useState([]);
    
    return <userDash.Provider value={{users, setUsers, theme, setTheme}}>{ children }</userDash.Provider>
}

export default DashboardContext;
import React, { useContext } from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/pages/dashboard";
import { userDash } from "./context/dashboardContext";
import Login from "./components/pages/login";
import ProtectedLayout from "./components/layout/protectedLayout";
import NotFoundView from "./components/pages/notfoundview";



function App(props) {
  const { theme } = useContext(userDash);
  
  return (
    <div className="App" data-theme={theme ? `light` : `dark`}>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route  path="/*" element={
              <ProtectedLayout>
                <Dashboard/>
              </ProtectedLayout>} 
              />
              <Route path="*" element={<NotFoundView/>}/>
          </Routes>
          
    </div>   
  );
}

export default App;
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import User from "../users/user";
import EditUser from "../users/editUser";
import AddUser from "../users/addUser";
import NavBar from "../nav/nav";
import SideBar from "../sidebar/sidebar";
import UsersList from "../users/usersList";
import { AddUserIcon } from "../../images/svgIcons/svgIcons";
import { userDash } from "../../context/dashboardContext";


const Dashboard = () => {

   const { users, setUsers } = useContext(userDash);

  
  return (
   <div className="bg-base-100 drawer drawer-mobile">
         <input id="drawer" type="checkbox" className="drawer-toggle" />
         <div className="drawer-content">
            <NavBar/>
         
            <div className="p-6 pb-16">
               
                  <div className="flex mb-4 items-end">
                  <div className="stats shadow">
                     <div className="stat">
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value">{ users.length }</div>
                     </div>
                     
                     </div>
                     <Link className="btn mt-4  ml-auto" to={{pathname: `add-user`,state: { modal: true }}} >
                        <AddUserIcon/>
                         <span className="ml-2">Add New User</span>
                     </Link> 
                  </div>
               <UsersList/>

               <Routes>
                  <Route path="/add-user" element={<AddUser/>} />
                  <Route path="/edit-user=:id" element={<EditUser/>} />
                  <Route path="/view-user=:id" element={<User/>} />
               </Routes>    
            </div>
         </div> 
         <SideBar/>
   </div>
  );
}

export default Dashboard;
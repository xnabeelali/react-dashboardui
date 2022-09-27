import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userDash } from "../../context/dashboardContext";
import { useAuth } from "../../context/useAuth";
import { HamburgerMobileIcon, ThemeDarkIcon, ThemeLightIcon } from "../../images/svgIcons/svgIcons";


const NavBar = () => {
  const { theme, setTheme } = useContext(userDash);
  const { loggedInUser, logout } = useAuth();
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
         <div className="navbar w-full">
            <span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
               <label htmlFor="drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
                  <HamburgerMobileIcon/>
               </label>
            </span>
            <div className="flex-1">
            </div>
            <div className="flex-none gap-2">
               <label className="swap swap-rotate mr-4">
                  <input type="checkbox" onChange={(e) => setTheme(!theme)}/>
                  <ThemeLightIcon/>
                  <ThemeDarkIcon/>
                </label>
               <div className="dropdown dropdown-end mr-4">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                     <img src={loggedInUser.user.avatar} alt="profile-pic"/>
                  </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                  
                    <li><Link>Settings</Link></li>
                    <li><Link onClick={logout}>Logout</Link></li>
                  </ul>
               </div>
            </div>
            </div>

         </div>
  );
}

export default NavBar;
import React from "react";
import { Link } from "react-router-dom";
import { InboxIcon, TaskIcon, TeamsIcon, UsersIcon } from "../../images/svgIcons/svgIcons";


const SideBar = () => {
  return (
    <div className="drawer-side">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <div className="bg-base-200 w-80">
        <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
            <Link to="/" className="flex-0 btn btn-ghost px-2">
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                    <span className="text-base-content uppercase">Dashboard</span>
                </div>
            </Link>
        </div>

        <ul className="menu menu-compact flex flex-col pt-4 px-4">
            <li className="py-2">
                <Link><UsersIcon/>Users</Link>
            </li>
            <li className="py-2">
                <Link><TeamsIcon/>Teams</Link>
            </li>
            <li className="py-2">
                <Link><TaskIcon/>Task</Link>
            </li>
            <li className="py-2">
                <Link><InboxIcon/>Inbox</Link>
            </li>
        </ul>
    </div>
        
    </div>
  );
}

export default SideBar;
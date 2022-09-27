import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, getDeletedUser } from "../../app/api";
import { userDash } from "../../context/dashboardContext";
import { useAuth } from "../../context/useAuth";
import { DeleteIcon, EditIcon, ViewIcon } from "../../images/svgIcons/svgIcons";
import Pagination from "../pagination/pagination";


const UsersList = () => {
  const { users, setUsers } = useContext(userDash);
  const { loggedInUser, isAdmin } = useAuth();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ usersPerPage ] = useState(5);

  const loadUsers = async () => {
   try {
    const res = await getUsers();
    setUsers(res.data);
   } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
   try {
      await getDeletedUser(id);
      loadUsers();
      setCurrentPage(1);
   } catch (error) {
      console.log(error);
   }
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const isPagination = users.length > usersPerPage;
  

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <div>
      <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row overflow-scroll">
        <table className="table w-full ">
            <thead>
              <tr>
                  <th>
                      <label>
                          <input type="checkbox" className="checkbox" />
                      </label>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {currentUsers.map((user, index) => (
                <tr className="hover" key={index}>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>    
                    </th>
                    <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                <img src={user.avatar} alt='avatar' />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{user.firstName}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span >{user.email}</span>
                    </td>
                    <td> <div className="badge badge-accent badge-outline">Active</div></td>
                    <td>
                        <div className="flex">
                            <Link className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" to={`view-user=${user.id}`}>
                              <ViewIcon/>
                            </Link>
                            { 
                              ((isAdmin && user.id === 1) || (user.id !== 1)) &&
                              <Link className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" to={{pathname: `edit-user=${user.id}`, state: { modal: true }}} >
                                <EditIcon/>
                              </Link> 
                            }
                            
                            { 
                            
                            (loggedInUser.user.id !== user.id && user.id !== 1) &&
                              <Link className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={() => deleteUser(user.id)}>
                                <DeleteIcon/>
                              </Link>
                            }
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>
      {isPagination &&
        <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            currentPage={currentPage}
            paginate={paginate}
          />
      }
    </div>
    
  );
}

export default UsersList;
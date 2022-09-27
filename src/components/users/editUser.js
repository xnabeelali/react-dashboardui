import React, { useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, getUpdatedUser, getUsers } from "../../app/api";
import { userDash } from "../../context/dashboardContext";


const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const { setUsers } = useContext(userDash);
    
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

  const [showModal, setShowModal] = useState(false);

  const { firstName, lastName, email } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

 
  const loadUser = async () => {
    try {
        const result = await getUser(id);
        setUser(result.data);
        setShowModal(true);
    } catch (error) {
        console.log(error);
    }
  };

  const loadUsers = async () => {
    try {
        const result = await getUsers();
        setUsers(result.data);
    } catch (error) {
        console.log(error);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
        await getUpdatedUser(id, user);
        navigate("/dashboard");
        loadUsers();
    } catch (error) {
        console.log(error);
      }
  };

  return (
    showModal && 
        <div className='modal modal-open'>
          <div className="modal-box relative">
              <div  className="btn btn-sm btn-circle absolute right-2 top-2" onClick={e => {setShowModal(false); navigate("/dashboard")}}>✕</div>
              <h3 className="font-bold text-lg mb-3">Edit user!</h3>
              <form onSubmit={e => onSubmit(e)}>
                  <div className="form-group mb-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">First name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter Your First Name"
                                name="firstName"
                                value={firstName}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                  </div>
                  <div className="form-group mb-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Last name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter Your Last Name"
                                name="lastName"
                                value={lastName}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                  </div>
                  {(user.id !== 1) && <div className="form-group mb-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Enter Your E-mail Address"
                                name="email"
                                value={email}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                  </div>}
                  <button className="btn mt-4">Update User</button>
                  </form>
              </div>
        </div>
  );
}

export default EditUser;
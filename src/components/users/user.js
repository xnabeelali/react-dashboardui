import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../app/api";

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getUser(id);
        setUser(res.data);
        setShowModal(true)
      } catch (error) {
        console.log(error);
      }
    };
    loadUser();
  }, [id]);

  return (
    showModal && 
    <div className='modal modal-open'>
      <div className="modal-box relative">
          <div  className="btn btn-sm btn-circle absolute right-2 top-2" onClick={e => {setShowModal(false); navigate("/dashboard")}}>✕</div>
              <div className="avatar">
                <div className="mask mask-circle w-30 h-30">
                <img src={user.avatar} alt='avatar' />
              </div>
            </div>
            <h3 className="font-bold text-[40px] mt-3">{user.firstName} {user.lastName}</h3>
            <span className="text-lg mb-3">{user.email}</span>
      </div>
    </div>
  );
}

export default User;
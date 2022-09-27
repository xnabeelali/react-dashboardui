import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";

const Login = () => {

    const  {login}  = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password")
    });
  };



  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="pt-6 pb-2">Please use credentials below for demo.</p>
                <p className="text-sm">Username: admin@example.com <br/>Password: 12345</p>
                <p className="text-[12px] mt-4">Note: You can use same Password for new created user.</p>
            </div>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Enter your email" className="input input-bordered" 
                                name="email"
                                value={email}
                                onChange={e => onInputChange(e)}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter your password" className="input input-bordered"  
                                name="password"
                                value={password}
                                onChange={e => onInputChange(e)}/>
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login;
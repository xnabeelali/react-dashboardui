import React from "react";
import { Link } from "react-router-dom";


const NotFoundView = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
            <h1 className="text-5xl font-bold">Page Not Found</h1>
                <p className="py-6">What are you looking for?</p>
            <Link to="/" className="btn btn-primary">Go to home</Link>
        </div>
  </div>
</div>
  );
}

export default NotFoundView;
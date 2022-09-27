import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="btn-group mt-8">
        {pageNumbers.map(number => (
            <button key={number} className={
                currentPage === number ? "btn btn-sm btn-active" 
                : "btn btn-sm" } onClick={() => paginate(number)}> {number} </button>
        ))}
    </div>
  );
};

export default Pagination;
import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="d-flex justify-content-end">
      <Pagination>
        <Pagination.Prev 
          onClick={() => handlePageClick(currentPage - 1)} 
          disabled={currentPage === 0} 
        />
        
        {[...Array(totalPages).keys()].map(pageNumber => (
          <Pagination.Item 
            key={pageNumber} 
            active={pageNumber === currentPage}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next 
          onClick={() => handlePageClick(currentPage + 1)} 
          disabled={currentPage === totalPages - 1} 
        />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
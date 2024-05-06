import React from 'react';

const Pagination: React.FC<any> = ({ pagination, handlePageChange }) => {
  return (
    <div className="pagination justify-content-center">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => handlePageChange(pagination.page - 1)}
      >
        Anterior
      </button>
      <span className="mt-2">Página: {pagination.page}</span>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => handlePageChange(pagination.page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;

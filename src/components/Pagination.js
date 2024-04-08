import React from 'react';
import './Page.css';

function Pagination({ currentPage, totalPages, goToPreviousPage, goToNextPage }) {
    return (
        <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>Trang trước</button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>Trang sau</button>
        </div>
    );
}

export default Pagination;

function Pagination({ page, pageCount, onPageChange }) {
    if (pageCount <= 1) return null;

    return (
        <nav aria-label="Table pagination">
            <ul className="pagination justify-content-end mt-3">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                </li>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                    <li key={number} className={`page-item ${page === number ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}
                <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(page + 1)} disabled={page === pageCount}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;

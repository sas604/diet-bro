import styled from 'styled-components';

const PaginationStyles = styled.nav`
  margin-top: auto;
  position: static;
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    gap: 1rem;
    align-items: baseline;
  }
  button {
    background: transparent;
    padding: 0.5rem 0.7rem;
    line-height: 1;
    appearance: none;
    border: 2px solid var(--purple);
    border-radius: 3px;
    color: var(--text-color);

    cursor: pointer;
    &.active {
      background-color: var(--purple);
      color: white;
    }
  }
`;

export default function Pagination({ currentPage, pages, setPage }) {
  if (pages.length === 1) return null;
  const lastPage = pages[pages.length - 1];
  let truncated;
  if (pages.length > 7) {
    truncated = true;
    pages = pages.filter((page) => {
      if (page === 1 || page === lastPage) return false;
      if (
        page === currentPage ||
        page === currentPage - 1 ||
        page === currentPage + 1
      ) {
        return true;
      }
      if (currentPage === 1 && page < 4) {
        return true;
      }
      if (currentPage === lastPage && page > pages[pages.length - 4]) {
        return true;
      }

      return false;
    });
  }
  if (!truncated) {
    return (
      <PaginationStyles>
        <ul>
          {pages.map((page, i) => (
            <li key={'page-' + i}>
              <button
                onClick={() => setPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </PaginationStyles>
    );
  }
  return (
    <PaginationStyles>
      <ul>
        <li>
          <button
            onClick={() => setPage(1)}
            className={currentPage === 1 ? 'active' : ''}
          >
            {1}
          </button>
        </li>
        {currentPage > 3 && truncated && <li>...</li>}
        {pages.map((page, i) => (
          <li key={'page-' + i}>
            <button
              onClick={() => setPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage < lastPage - 1 && truncated && <li>...</li>}
        <li>
          <button
            onClick={() => setPage(lastPage)}
            className={currentPage === lastPage ? 'active' : ''}
          >
            {lastPage}
          </button>
        </li>
      </ul>
    </PaginationStyles>
  );
}

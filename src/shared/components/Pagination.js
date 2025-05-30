import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const { total, totalPages, currentPage, next, prev, hasNext, hasPrev } =
    pages;
  const [searchParams, setSearchParams] = useSearchParams();
  const formatURL = (page) => {
    return `/search?keyword=${searchParams.get("keyword")}&page=${page}`;
  };
  const clickPage = (e, page) => {
    if (page === "...") return e.preventDefault();
  };
  const rederHTMLPages = (delta = 1) => {
    const htmlPages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        htmlPages.push(i);
      } else if (i === left - 1 || i === right + 1) {
        htmlPages.push("...");
      }
    }
    return htmlPages;
  };
  return (
    <>
      <ul className="pagination">
        {hasPrev && (
          <li className="page-item">
            <Link className="page-link" to={`${formatURL(prev)}`}>
              Trang trước
            </Link>
          </li>
        )}
        {rederHTMLPages().map((item, index) => (
          <li className={`page-item ${item === currentPage ? "active" : ""}`}>
            <Link
              onClick={(e) => clickPage(e, item)}
              className="page-link"
              to={`${formatURL(item)}`}
            >
              {item}
            </Link>
          </li>
        ))}
        {hasNext && (
          <li className="page-item">
            <Link className="page-link" to={`${formatURL(next)}`}>
              Trang sau
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Pagination;

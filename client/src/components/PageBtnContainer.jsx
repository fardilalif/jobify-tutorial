import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs.jsx";
import Wrapper from "./../assets/wrappers/PageBtnContainer";
const PageBtnContainer = () => {
  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", page);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ page, activeClass }) => {
    return (
      <button
        key={page}
        className={`btn page-btn ${activeClass && "active"}`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // first page
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );

    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // one before current
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }

    // once after current
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // dots
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-2">
          ...
        </span>
      );
    }

    // last page
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;

import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  //create array of pages base on numOfPages
  // const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  //handlePageChange
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  //addPageButton
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn page-btn ${activeClass && 'active'}`}
      >
        {pageNumber}
      </button>
    );
  };

  //renderPageButtons
  const renderPageButtons = () => {
    const pageButtons = [];

    //fist page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }),
    );

    //dot...
    if (currentPage > 3) {
      pageButtons.push(<span className="page-btn dots">...</span>);
    }

    //(currentPage - 1)
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        }),
      );
    }

    //current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        }),
      );
    }

    //(currentPage + 1)
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        }),
      );
    }

    //dot...
    if (currentPage < numOfPages - 2) {
      pageButtons.push(<span className="page-btn dots">...</span>);
    }

    //last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      }),
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      {/* prev button */}
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = numOfPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>

      {/* center paginate button  */}
      <div className="btn-container">{renderPageButtons()}</div>

      {/* next button */}
      <button
        className="btn prev-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) {
            nextPage = 1;
          }
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

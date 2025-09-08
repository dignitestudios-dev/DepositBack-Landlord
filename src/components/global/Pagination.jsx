import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  setCurrentPage,
}) => {
  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const DOTS = "dots";

  function getDisplayPages(currentPage, totalPages, siblingCount = 1) {
    const totalPageNumbers = siblingCount * 2 + 2; // 1 + last + current ± siblings + 2 dots

    // --- case 1: show everything if we have room ----------------------------
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // --- calculate range bounds --------------------------------------------
    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const pages = [1];

    if (showLeftDots) {
      pages.push(DOTS);
    } else {
      for (let i = 2; i < leftSibling; i++) pages.push(i);
    }

    for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);

    if (showRightDots) {
      pages.push(DOTS);
    } else {
      for (let i = rightSibling + 1; i < totalPages; i++) pages.push(i);
    }

    pages.push(totalPages);
    return pages;
  }

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-2 w-full max-w-[552px] bg-white rounded-[8px] shadow-sm py-3 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 transition ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <IoIosArrowBack />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2 justify-center overflow-x-auto w-[350px]">
          {getDisplayPages(currentPage, totalPages).map((item, idx) =>
            item === DOTS ? (
              <div
                key={`dots-${idx}`}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                …
              </div>
            ) : (
              <div
                key={item}
                onClick={() => onPageChange(item)}
                className={`
          w-[40px] h-[40px] flex justify-center items-center rounded-[6px]
          text-sm font-medium cursor-pointer 
          ${
            item === currentPage
              ? "bg-[#2954e2] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 transition ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <span>Next</span>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

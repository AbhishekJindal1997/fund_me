import React from "react";

const Pagination = ({
  campaignsPerPage,
  totalCampaigns,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCampaigns / campaignsPerPage); i++) {
    pages.push(i);
  }

  console.log("totalCampaigns", totalCampaigns);
  console.log("pages", pages);
  return (
    <div className='mt-20 items-center  flex justify-center '>
      {pages.map((page, index) => (
        <button
          key={index}
          className={
            page === currentPage
              ? "relative mx-2 z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
              : "relative mx-2 z-10 inline-flex items-center border border-gray-50 bg-gray-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
          }
          onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

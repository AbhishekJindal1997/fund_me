import React from "react";

const CampaignTitle = ({ CampaignName, Category, Description }) => {
  return (
    <div>
      <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
        {CampaignName}
      </h2>
      <p className='mt-2 text-gray-500'>{Category}</p>
      <p className='mt-4 text-gray-500'>{Description}</p>
    </div>
  );
};

export default CampaignTitle;

import React from "react";

const CampaignImages = ({ image, imageTwo, imageThree, imageFour }) => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8'>
      <img src={image} className='rounded-lg bg-gray-100' alt='campaign 1' />
      <img src={imageTwo} className='rounded-lg bg-gray-100' alt='campaign 1' />
      <img
        src={imageThree}
        className='rounded-lg bg-gray-100'
        alt='campaign 1'
      />
      <img
        src={imageFour}
        className='rounded-lg bg-gray-100'
        alt='campaign 1'
      />
    </div>
  );
};

export default CampaignImages;

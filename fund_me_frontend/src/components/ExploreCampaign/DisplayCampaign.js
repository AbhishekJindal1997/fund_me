import React from "react";
import { Link } from "react-router-dom";

const DisplayCampaign = ({ currentCampaign, date, time }) => {
  return (
    <div className='space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 '>
      {currentCampaign.map((campaign) => (
        <Link
          key={campaign.id}
          className='pt-8 '
          to={`/campaign/${campaign.id}`}
          state={{ campaign: campaign }}>
          <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
            <img
              src={campaign.image}
              alt='campaign'
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className=' mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
            <div
              className='bg-blue-600 h-2.5 rounded-full'
              style={{ width: `${campaign.progressMeterWidth}%` }}></div>
          </div>
          <h3 className='mt-2 text-sm text-gray-500'>{campaign.Category}</h3>
          <p className='text-base font-semibold text-gray-900'>
            {campaign.CampaignName}
          </p>
          <h3 className=' text-sm text-gray-900'>
            <span className='font-semibold '>Requested By:</span>{" "}
            {campaign.RequesterName}
          </h3>
          <h3 className=' text-sm text-gray-900'>
            <span className='font-semibold '>Created at:</span>{" "}
            {
              (date = new Date(
                campaign.timestamp.seconds * 1000 +
                  campaign.timestamp.nanoseconds / 1000000
              ).toDateString())
            }{" "}
            at{" "}
            {
              (time = new Date(
                campaign.timestamp.seconds * 1000 +
                  campaign.timestamp.nanoseconds / 1000000
              ).toLocaleTimeString())
            }
          </h3>

          <p className='text-indigo-600 mt-1 font-semibold'>
            ${campaign.AmountRequired}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default DisplayCampaign;

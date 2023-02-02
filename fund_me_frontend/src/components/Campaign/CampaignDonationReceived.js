import React from "react";

const CampaignDonationReceived = ({
  loading,
  donationsReceived,
  totalAmount,
}) => {
  return (
    <div className='overflow-hidden  bg-gray-100 w-full mx-auto shadow sm:rounded-lg lg:w-10/12'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          Donations Received
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          A list of Some of the top donations received for this cause
        </p>
      </div>
      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-0'>
          <div className='border-t border-gray-200'></div>
        </div>
      </div>
      <dl>
        {loading && "Loading..."}
        {donationsReceived?.map((donationReceived) => {
          totalAmount += parseFloat(donationReceived.Amount);
          return (
            <div
              key={Math.random()}
              className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                {donationReceived.Username}
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                $ {donationReceived.Amount}
              </dd>
            </div>
          );
        })}
      </dl>
      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-0'>
          <div className='border-t border-gray-200'></div>
        </div>
      </div>
      <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
        <dt className='text-sm font-bold text-gray-500'>Amount Raised</dt>
        <dd className='mt-1 text-sm  font-bold text-gray-900 sm:col-span-2 sm:mt-0'>
          $ {totalAmount}
        </dd>
      </div>
    </div>
  );
};

export default CampaignDonationReceived;

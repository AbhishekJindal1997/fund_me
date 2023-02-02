import React from "react";
import { ToastContainer } from "react-toastify";

const CampaignDonationForm = ({ handleSubmit, setUsername, setAmount }) => {
  return (
    <div>
      {" "}
      <div>
        <p className='mt-12 mb-8 text-gray-500 text-xl'>
          Be the change you want to see in the world and donate now.
        </p>

        <form
          className='col-span-6 sm:col-span-3'
          method='POST'
          onSubmit={handleSubmit}>
          <label
            htmlFor='first-name'
            className='block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <input
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type='text'
            name='full-name'
            id='full-name'
            autoComplete='given-name'
            className='mt-1 block w-11/12 p-2 border border-black mb-5 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />

          <label
            htmlFor='first-name'
            className='block text-sm font-medium text-gray-700'>
            Amount to be donated
          </label>
          <input
            required
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            type='number'
            name='first-name'
            id='first-name'
            autoComplete='given-name'
            placeholder='$ 0.00'
            className='mt-1 block w-11/12 p-2 border border-black mb-5 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
          <div className='mt-8'>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Donate Now
              <ToastContainer
                position='top-center'
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignDonationForm;

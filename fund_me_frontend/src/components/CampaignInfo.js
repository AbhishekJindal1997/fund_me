import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../config";

const CampaignInfo = ({
  CampaignName,
  Description,
  image,
  imageTwo,
  imageThree,
  imageFour,
  Category,
  AmountRequired,
  RequesterName,
  DonationLimit,
  progressMeterWidth,
  id,
}) => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0);

  let totalAmount = 0;
  let progressMeterBar;

  // Update progress meter in firestore database
  const updateProgressMeter = async (id, progressMeterWidth) => {
    const progressMeterDoc = doc(db, "Campaigns", id);
    const updateField = { progressMeterWidth: progressMeterBar };
    await updateDoc(progressMeterDoc, updateField);
    console.log("progress meter bar ", progressMeterBar);
  };

  // Camapign Features array
  const features = [
    { name: "Amount Needed", description: "$" + AmountRequired },
    { name: "Requested By", description: RequesterName },
    { name: "Donation Limit", description: "$" + DonationLimit },
  ];

  // Connection to sub collection of campaign
  const campaingsSubCollectionRef = collection(
    db,
    "Campaigns",
    id,
    "Donations"
  );

  const [donationsReceived, loading] = useCollectionData(
    campaingsSubCollectionRef
  );

  // Hanndles Donation form
  const handleSubmit = async (event) => {
    event.preventDefault();
    // API calls
    await addDoc(campaingsSubCollectionRef, {
      Username: username,
      Amount: amount,
    });

    toast.success("Thanks for you support.");
    event.target.reset();
  };

  return (
    <div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
        <div>
          {/* Campaign Title & Description */}
          <div>
            <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
              {CampaignName}
            </h2>
            <p className='mt-2 text-gray-500'>{Category}</p>
            <p className='mt-4 text-gray-500'>{Description}</p>
          </div>

          {/* Campaign Details */}
          <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
            {features?.map((feature) => (
              <div key={feature.name} className='border-t border-gray-200 pt-4'>
                <dt className='font-medium text-gray-900'>{feature.name}</dt>
                <dd className='mt-2 text-sm text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Campaign Images */}
        <div className='grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8'>
          <img
            src={image}
            className='rounded-lg bg-gray-100'
            alt='campaign 1'
          />
          <img
            src={imageTwo}
            className='rounded-lg bg-gray-100'
            alt='campaign 1'
          />
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

        {/* Donations Received */}
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
          <div>
            {
              (progressMeterBar = Math.ceil(
                (totalAmount / parseFloat(AmountRequired)) * 100
              ))
            }{" "}
            %
          </div>
        </div>

        {/* Donations Form */}
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
                  autoClose={500}
                  hideProgressBar={true}
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
          <button
            onClick={() => updateProgressMeter(id, progressMeterWidth)}
            className='rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Test Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;

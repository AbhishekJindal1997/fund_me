import React, { useState } from "react";
import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const RaiseFundsForm = () => {
  const [requesterName, setRequesterName] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [amountRequired, setAmountRequired] = useState(0);
  const [donationLimit, setDonationLimit] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");

  const campaingsCollectionRef = collection(db, "Campaigns");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(campaingsCollectionRef, {
        AmountRequired: amountRequired,
        CampaignName: campaignTitle,
        Category: category,
        Description: description,
        DonationLimit: donationLimit,
        RequesterName: requesterName,
        image: image,
        imageTwo: imageTwo,
        imageThree: imageThree,
        imageFour: imageFour,
      });
      toast.success("Campaign created successfully");
      setTimeout(() => {
        navigate("/explore-campaigns");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-10/12 mt-8 mx-auto lg:w-6/12 md:w-8/12'>
      <form method='POST' onSubmit={handleSubmit}>
        <div className='shadow sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
            <h1 className='text-2xl text-gray-800 '>
              Your support can help create a more equitable and just world.
            </h1>
            <p className='text-sm text-gray-500 italic'>
              With our user-friendly app, you can donate to your favorite causes
              quickly and easily, without any hassle. Whether you want to
              support a local charity, a national organization, or a global
              cause, our fundraising platform makes it easy to give back and
              make a real impact. Join us today and help make the world a better
              place, one donation at a time.
            </p>

            <div className='hidden sm:block' aria-hidden='true'>
              <div className='py-5'>
                <div className='border-t border-gray-200' />
              </div>
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='full-name'
                className='block text-sm font-medium text-gray-700'>
                Requester Name
              </label>
              <input
                type='text'
                required
                name='requester-name'
                id='requester-name'
                onChange={(event) => {
                  setRequesterName(event.target.value);
                }}
                autoComplete='gi p-2 border border-gray-400ven-name'
                className='mt-1 p-2 border border-gray-300 shadow-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='campaign-title'
                className='block text-sm font-medium text-gray-700'>
                Campaign Title
              </label>
              <input
                type='text'
                required
                onChange={(event) => {
                  setCampaignTitle(event.target.value);
                }}
                name='campaign-title'
                id='campaign-title'
                autoComplete='gi p-2 border border-gray-400ven-name'
                className='mt-1 p-2 border border-gray-300 shadow-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='amount-required'
                className='block text-sm font-medium text-gray-700'>
                Amount Required
              </label>
              <input
                type='number'
                required
                onChange={(event) => {
                  setAmountRequired(event.target.value);
                }}
                placeholder='$ 0.00'
                name='amount-required'
                id='amount-required p-2 border border-gray-400d'
                autoComplete='given-name'
                className='mt-1 block w-full border  p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='donation-limit'
                className='block text-sm font-medium text-gray-700'>
                Donation Limit
              </label>
              <input
                required
                type='number'
                placeholder='$ 0.00'
                onChange={(event) => {
                  setDonationLimit(event.target.value);
                }}
                name='donation-limit'
                id='donation-limit p-2 border border-gray-400d'
                autoComplete='given-name'
                className='mt-1 block w-full border  p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700'>
                Category
              </label>
              <select
                required
                id='category'
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                name='category'
                autoComplete='category-name'
                className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'>
                <option>Climate</option>
                <option>Animals</option>
                <option>Education</option>
              </select>
            </div>
            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <div className='mt-1'>
                <textarea
                  id='description'
                  name='description'
                  rows={3}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  className='mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  placeholder='  Breif description for your campaign'
                  defaultValue={""}
                />
              </div>
            </div>

            <div className='col-span-3 sm:col-span-2'>
              <label
                htmlFor='image'
                className='block text-sm font-medium text-gray-700'>
                Images Url
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                  https://
                </span>
                <input
                  required
                  type='text'
                  name='image'
                  id='image'
                  onChange={(event) => {
                    setImage(event.target.value);
                  }}
                  className='block p-2 border  w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  placeholder='www.example.com'
                />
              </div>
            </div>

            <div className='col-span-3 sm:col-span-2'>
              <label
                htmlFor='image-two'
                className='block text-sm font-medium text-gray-700'>
                Images Url
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                  https://
                </span>
                <input
                  type='text'
                  onChange={(event) => {
                    setImageTwo(event.target.value);
                  }}
                  name='image-two'
                  id='image-two'
                  className='block p-2 border  w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  placeholder='www.example.com'
                />
              </div>
            </div>

            <div className='col-span-3 sm:col-span-2'>
              <label
                htmlFor='image-three'
                className='block text-sm font-medium text-gray-700'>
                Images Url
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                  https://
                </span>
                <input
                  type='text'
                  onChange={(event) => {
                    setImageThree(event.target.value);
                  }}
                  name='image-three'
                  id='image-three'
                  className='block p-2 border  w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  placeholder='www.example.com'
                />
              </div>
            </div>

            <div className='col-span-3 sm:col-span-2'>
              <label
                htmlFor='image-four'
                className='block text-sm font-medium text-gray-700'>
                Images Url
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                  https://
                </span>
                <input
                  onChange={(event) => {
                    setImageFour(event.target.value);
                  }}
                  type='text'
                  name='image-four'
                  id='image-four'
                  className='block p-2 border  w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  placeholder='www.example.com'
                />
              </div>
            </div>

            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
              <button
                type='submit'
                className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                Create a campaign
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default RaiseFundsForm;

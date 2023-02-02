import React, { useState, useEffect } from "react";
import Sort from "./Sort";
import FilterBy from "./FilterBy";
import Pagination from "./Pagination";
import { getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { campaingsCollectionRef } from "../firebase-collections";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AllCampaigns = () => {
  const [campaings, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(10);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  // tailwind ui
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Get all the camapigns information
  const getAllCampaigns = async () => {
    const data = await getDocs(campaingsCollectionRef);
    setCampaigns(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //// FILTERING
  // filter campaigns on category
  const filteredCampaigns = campaings?.filter(
    (campaign) => campaign.Category === selectedCategory
  );

  //// PAGINATION
  // Get indexes of first page, last page for pagination
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  // Getting the current campaign to display on screen
  const currentCampaign =
    filteredCampaigns.length > 0
      ? filteredCampaigns?.slice(indexOfFirstCampaign, indexOfLastCampaign)
      : campaings?.slice(indexOfFirstCampaign, indexOfLastCampaign);
  // getting total campaigns length for pagination
  const totalCampaigns =
    filteredCampaigns?.length > 0
      ? filteredCampaigns?.length
      : campaings?.length;

  //// SORTING
  // sorting filteredCampaigns and campaigns
  const sortCampaigns =
    filteredCampaigns?.length > 0 ? filteredCampaigns : campaings;

  let time = "";
  let date = "";

  // console.log("timestmaps in array ", timestamps);
  const sortedCampaign = [...sortCampaigns];
  // sorting campaigns on users
  const sortByName = () => {
    setSorted({ sorted: "name", reversed: false });
    sortedCampaign.sort((a, b) => {
      const userA = a.RequesterName;
      const userB = b.RequesterName;
      return userA.localeCompare(userB);
    });
    setCampaigns(sortedCampaign);
  };
  // sorting campaigns on completing soon
  const sortByCompletingSoon = () => {
    setSorted({ sorted: "progressMeterWidth", reversed: false });
    sortedCampaign.sort((a, b) => {
      const progressMeterWidthA = a.progressMeterWidth;
      const progressMeterWidthB = b.progressMeterWidth;
      return progressMeterWidthB - progressMeterWidthA;
    });
    console.log("completing soon ", sortedCampaign);
    setCampaigns(sortedCampaign);
  };

  // sorting campaigns on recently created
  const sortByRecentlyCreated = () => {
    setSorted({ sorted: "timestamp", reversed: false });
    sortedCampaign.sort((a, b) => {
      const timestampA = a.timestamp;
      const timestampB = b.timestamp;
      return timestampB - timestampA;
    });
    setCampaigns(sortedCampaign);
  };

  // Page Load
  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 '>
        {/* Headline */}
        <div className='flex'>
          <h2 className='text-2xl font-bold text-gray-900 flex-1 '>
            Featured Campaigns
          </h2>

          {/* Sort By */}
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                Sort By
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => sortByRecentlyCreated()}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Recently Created
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => sortByName()}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Users
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => {
                          sortByCompletingSoon();
                        }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Completing Soon
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Filter By */}
          <Menu as='div' className='relative inline-block text-left ml-5'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                Filter By
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => setSelectedCategory("Climate")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Climate
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => setSelectedCategory("Animals")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Animals
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => setSelectedCategory("Education")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Education
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Display All the campaigns */}
        <div className='space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 '>
          {currentCampaign.map((campaign) => (
            <Link
              key={campaign.id}
              className='pt-8 '
              to={`/campaign/${campaign.id}`}
              state={{ campaign: campaign }}
            >
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                <img
                  src={campaign.image}
                  alt='campaign image'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className=' mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
                <div
                  className='bg-blue-600 h-2.5 rounded-full'
                  style={{ width: `${campaign.progressMeterWidth}%` }}
                ></div>
              </div>
              <h3 className='mt-2 text-sm text-gray-500'>
                {campaign.Category}
              </h3>
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

        <Pagination
          totalCampaigns={totalCampaigns}
          campaignsPerPage={campaignsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AllCampaigns;

import React, { useState, useEffect } from "react";
import Sort from "./Sort";
import FilterBy from "./FilterBy";
import Pagination from "./Pagination";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const AllCampaigns = () => {
  const [campaings, setCampaigns] = useState([]);

  // establishing a connection to specific collection
  const campaingsCollectionRef = collection(db, "Campaigns");

  // Get all the camapigns information
  const getAllCampaigns = async () => {
    const data = await getDocs(campaingsCollectionRef);
    setCampaigns(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Every time page loads, we call the following functions to fetch data
  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 '>
        <div className='flex'>
          <h2 className='text-2xl font-bold text-gray-900 flex-1 '>
            Featured Campaigns
          </h2>
          <Sort />
          <FilterBy />
        </div>

        <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
          {console.log(campaings)}
          {campaings.map((campaign) => (
            <Link
              key={campaign.id}
              to={`/campaign/${campaign.id}`}
              state={{ campaign: campaign }}>
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                <img
                  src={campaign.image}
                  alt='campaign image'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-6 text-sm text-gray-500'>
                {campaign.Category}
              </h3>
              <p className='text-base font-semibold text-gray-900'>
                {campaign.CampaignName}
              </p>
              <p className='text-indigo-600 font-semibold'>
                ${campaign.AmountRequired}
              </p>
            </Link>
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default AllCampaigns;

import React, { useState, useEffect } from "react";
import Sort from "./Sort";
import FilterBy from "./FilterBy";
import Pagination from "./Pagination";
import { getDocs } from "firebase/firestore";

import { campaingsCollectionRef } from "../../firebase-collections";
import DisplayCampaign from "./DisplayCampaign";

const AllCampaigns = () => {
  const [campaings, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(10);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  // Get all the camapigns information
  const getAllCampaigns = async () => {
    const data = await getDocs(campaingsCollectionRef);
    setCampaigns(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //// FILTERING
  // filter campaigns by category
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
        <div className='flex'>
          <h2 className='text-2xl font-bold text-gray-900 flex-1 '>
            Featured Campaigns
          </h2>
          <Sort
            sortByName={sortByName}
            sortByCompletingSoon={sortByCompletingSoon}
            sortByRecentlyCreated={sortByRecentlyCreated}
          />
          <FilterBy setSelectedCategory={setSelectedCategory} />
        </div>
        <DisplayCampaign
          currentCampaign={currentCampaign}
          date={date}
          time={time}
        />
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

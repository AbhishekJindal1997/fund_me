import React from "react";
// components
import Header from "../components/Header";
import Background from "../components/Background";
import AllCampaigns from "../components/ExploreCampaign/AllCampaigns";

const exploreCampaigns = () => {
  return (
    <div className='isolate'>
      <Background />
      <Header />
      <AllCampaigns />
    </div>
  );
};

export default exploreCampaigns;

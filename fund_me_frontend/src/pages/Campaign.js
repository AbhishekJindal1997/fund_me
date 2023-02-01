import React from "react";
// components
import Header from "../components/Header";
import Background from "../components/Background";
import CampaignInfo from "../components/CampaignInfo";
import { useLocation } from "react-router-dom";

const Campaign = () => {
  const location = useLocation();
  const campaign = location.state.campaign;
  console.log("cmapign ingo", campaign);

  return (
    <div className='isolate'>
      <Background />
      <Header />
      <CampaignInfo
        CampaignName={campaign.CampaignName}
        Description={campaign.Description}
        image={campaign.image}
        imageTwo={campaign.imageTwo}
        imageThree={campaign.imageThree}
        imageFour={campaign.imageFour}
        AmountRequired={campaign.AmountRequired}
        RequesterName={campaign.RequesterName}
        Category={campaign.Category}
        DonationLimit={campaign.DonationLimit}
        id={campaign.id}
        progressMeterWidth={campaign.progressMeterWidth}
      />
    </div>
  );
};

export default Campaign;

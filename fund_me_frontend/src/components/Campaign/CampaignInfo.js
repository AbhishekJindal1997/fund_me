import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config";
import CampaignDonationForm from "./CampaignDonationForm";
import CampaignDonationReceived from "./CampaignDonationReceived";
import CampaignFeatures from "./CampaignFeatures";
import CampaignImages from "./CampaignImages";
import CampaignTitle from "./CampaignTitle";

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
    progressMeterBar = Math.ceil(
      (totalAmount / parseFloat(AmountRequired)) * 100
    );

    const updateField = { progressMeterWidth: progressMeterBar };
    await updateDoc(progressMeterDoc, updateField);
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
    if (amount > parseInt(DonationLimit)) {
      toast.error(`Donation cannot be more than $ ${DonationLimit}`);
    } else {
      // API calls
      await addDoc(campaingsSubCollectionRef, {
        Username: username,
        Amount: parseInt(amount),
      });
      toast.success("Thanks for you support.");
      event.target.reset();
    }
  };

  useEffect(() => {
    updateProgressMeter(id, progressMeterWidth);
  });

  return (
    <div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
        <div>
          {/* Campaign Title & Description */}
          <CampaignTitle
            CampaignName={CampaignName}
            Description={Description}
            Category={Category}
          />
          <CampaignFeatures features={features} />
        </div>

        <CampaignImages
          image={image}
          imageTwo={imageTwo}
          imageThree={imageThree}
          imageFour={imageFour}
        />

        <CampaignDonationReceived
          loading={loading}
          donationsReceived={donationsReceived}
          totalAmount={totalAmount}
        />

        <CampaignDonationForm
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setAmount={setAmount}
        />
      </div>
    </div>
  );
};

export default CampaignInfo;

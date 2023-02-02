import React from "react";

const CampaignFeatures = ({ features }) => {
  return (
    <div>
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
  );
};

export default CampaignFeatures;

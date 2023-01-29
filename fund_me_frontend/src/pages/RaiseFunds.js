import React from "react";
// components
import Header from "../components/Header";
import Background from "../components/Background";
import RaiseFundsForm from "../components/RaiseFundsForm";

const RaiseFunds = () => {
  return (
    <div className='isolate'>
      <Background />
      <Header />
      <RaiseFundsForm />
    </div>
  );
};

export default RaiseFunds;

// React Libraries
import React from "react";
// components
import Header from "../components/Header";
import Banner from "../components/Banner";
import Background from "../components/Background";

const Home = () => {
  return (
    <>
      <div className='isolate bg-white'>
        <Background />
        <Header />
        <Banner />
      </div>
    </>
  );
};

export default Home;

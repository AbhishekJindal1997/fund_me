import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ExploreCampaigns from "./pages/ExploreCampaigns";
import RaiseFunds from "./pages/RaiseFunds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/explore-campaigns' element={<ExploreCampaigns />} />
        <Route path='/raise-funds' element={<RaiseFunds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

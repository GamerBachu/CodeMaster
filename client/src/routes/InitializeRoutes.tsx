import React from "react";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import { Route, Routes } from "react-router";
import ConcertsHome from "../pages/concerts/ConcertsHome";
import City from "../pages/concerts/City";
import Trending from "../pages/concerts/Trending";

const InitializeRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="account" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route>
    </Routes>
  );
};

export default InitializeRoutes;

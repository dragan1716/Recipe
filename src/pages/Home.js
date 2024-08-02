import React from "react";
import "./Home.css";
import Popular from "../components/Popular";
import Header from "../components/Header";
import Category from "../components/Category";

const Home = () => {
  return (
    <div className="ps-5">
      <Header />
      <div className="mt-6">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Find the best recipes <br /> for cooking
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="flex border-2 rounded-lg py-2 px-1 mt-6 me-6 border-gray-300 max-w-[768px] w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            className="text-sm w-full"
            type="text"
            placeholder="Search recipes"
          />
        </div>
      </div>
      <Popular />
      <Category />
    </div>
  );
};

export default Home;

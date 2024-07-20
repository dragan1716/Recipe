import React from "react";
import "./Start.css";
import { IoIosArrowRoundForward } from "react-icons/io";

const Start = () => {
  return (
    <div className="container">
      <div className="start-image h-screen w-full bg-center bg-cover relative">
        <div className="absolute bg-gradient-to-t from-black w-full h-full"></div>
      </div>
      <div className="start-content absolute top-0 left-0 h-full w-full text-center text-white pb-[80px] pt-[80px] flex flex-col justify-between">
        <div className="h-full">
          <h4 className="lg:text-3xl">
            <span className="font-medium">60k+</span> Premium recipes
          </h4>
        </div>
        <div className="h-full">
          <h1 className="text-5xl lg:text-8xl font-semibold mt-20">
            Let's <br /> Cooking
          </h1>
          <p className="mt-10 lg:text-3xl">Find the best recipes for cooking</p>
          <button className="custom-button rounded-xl mt-8 font-medium text-md  cursor-pointer justify-center items-center inline-flex py-3 px-6 bg-red-500 hover:bg-red-700">
            Start cooking{" "}
            <span className="arrow ml-2 text-3xl">
              {" "}
              <IoIosArrowRoundForward />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Recipe from "./Recipe";

const Popular = () => {
  const [recipes, setRecipes] = useState([]);
  const scrollRef = useRef(null);

  const fetchRecipes = async () => {
    try {
      const apiKey = process.env.REACT_APP_RECIPES_API_KEY;
      console.log("api  key:", apiKey);
      if (!apiKey) {
        throw new Error("API key is missing");
      }

      // const res = await axios.get(
      //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=9`
      // );
      // const res = await axios.get(
      //   `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9&include-tags=vegetarian`
      // );
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`
      );
      console.log(res);
      console.log("Test cuisines: ", res.data.recipes[1].cuisines);
      setRecipes(res.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-xl md:text-2xl font-bold">Popular recipes</h1>
      <div className="relative flex items-center overflow-x-scroll hide-scroll-bar group">
        <MdChevronLeft
          onClick={scrollLeft}
          size={40}
          className="rounded-full ml-1 opacity-50 hover:opacity-100 text-black absolute bg-gray-300 z-10 cursor-pointer hidden group-hover:block"
        />
        <div ref={scrollRef} id={"slider"} className="w-full h-full flex">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <MdChevronRight
          size={40}
          onClick={scrollRight}
          className="rounded-full ml-1 opacity-50 hover:opacity-100 text-black absolute right-2 bg-gray-300 z-10 cursor-pointer hidden group-hover:block"
        />
      </div>
    </div>
  );
};

export default Popular;

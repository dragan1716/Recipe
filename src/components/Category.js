import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const [cuisine, setCuisine] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("italian");
  let params = useParams();
  const getCuisine = async (name) => {
    const apiKey = process.env.REACT_APP_RECIPES_API_KEY;

    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisines`
    );
    const recipes = await data.json();
    console.log("Cusiine: ", recipes);
    setCuisine(recipes.results);
  };

  // useEffect(() => {
  //   getCuisine(params.type);
  //   console.log(params.type);
  // }, [params.type]);
  useEffect(() => {
    getCuisine(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="mt-10 ">
      <h1 className="text-xl md:text-2xl font-bold">Popular Category</h1>
      <ul>
        <li>American</li>
        <li>Italian</li>
        <li>Thai</li>
        <li>Chinese</li>
        <li>Mexican</li>
        <li>Mediterranean</li>
        <li>Asian</li>
      </ul>
    </div>
  );
};

export default Category;

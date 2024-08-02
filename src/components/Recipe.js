import React from "react";

const Recipe = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className="recipe-card mt-4 border border-gray-100 rounded-xl bg-gray-100 shadow-md"
    >
      <img
        className="w-full h-52 object-cover rounded-lg"
        src={recipe.image}
        alt={recipe.title}
      />
      <h1 className="text-md text-center font-semibold mt-2">{recipe.title}</h1>
    </div>
  );
};

export default Recipe;

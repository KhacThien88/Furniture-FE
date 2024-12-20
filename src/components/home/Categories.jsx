import React, { useEffect, useState } from "react";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("./img/Category/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-3 py-5 px-2">
      {categories.length > 0 &&
        categories.map((category, index) => (
          <div
            key={index}
            onClick={() => onSelectCategory(category.name)}
            className="flex flex-col h-32 w-32 justify-center items-center p-3 rounded-full bg-lime-200 hover:bg-lime-400 cursor-pointer transition-all ease-linear duration-150"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-10 h-10"
            />
            <h3 className="text-sm text-center font-bold py-2 w-full text-nowrap">
              {category.name}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default Categories;

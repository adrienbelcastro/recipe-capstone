import React from "react";
import { useState, useEffect } from "react";
import "./Macros.scss";
import axios from "axios";
import { nutritionApiKey, nutritionApiUrl } from "../../utils";

function Macros({ name }) {
  const recipeName = name;
  const [nutritionInfo, setNutritionInfo] = useState();
  const [nutrients, setNutrients] = useState({});

  useEffect(() => {
    axios
      .get(`${nutritionApiUrl}${recipeName}${nutritionApiKey}`)
      .then((result) => {
        const res = result.data.hits[0];
        setNutritionInfo(res);
        setNutrients({
          macros: {
            name: recipeName,
            calories: Math.round(res.recipe.calories),
            carbs: Math.round(res.recipe.totalNutrients.CHOCDF.quantity),
            fat: Math.round(res.recipe.totalNutrients.FAT.quantity),
            protein: Math.round(res.recipe.totalNutrients.PROCNT.quantity),
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recipeName]);

  if (!nutritionInfo) {
    return "Loading";
  } else {
    return (
      <div className="macros">
        <h4 className="macros__disclaimer">Entire Recipe</h4>
        <div className="macros__container">
          <h4 className="macros__calories">
            Calories: {nutrients.macros.calories}
          </h4>
          <h4 className="macros__fats">Fat: {nutrients.macros.fat}g</h4>
          <h4 className="macros__carbs">
            Carbohydrates: {nutrients.macros.carbs}g
          </h4>
          <h4 className="macros__protein">
            Protein: {nutrients.macros.protein}g
          </h4>
        </div>
      </div>
    );
  }
}

export default Macros;

import { Link } from "react-router-dom";
import RecipeCard from "../recipeCard/RecipeCard";
import "./RecipesList.scss";

function RecipesList(recipes) {
  const recipeData = recipes.recipes.meals;
  // console.log(thumb);

  // {
  //   if (!recipes) {
  //     return <div>Loading...</div>;
  //   }
  // }

  return (
    <section className="recipe-list">
      <h1 className="recipe-list__title">Recipes</h1>
      <div className="recipe-list__container">
        {recipeData.map((recipeData) => (
          <Link to={`/${recipeData.strMeal}`}>
            <RecipeCard
              key={recipeData.idMeal}
              title={recipeData.strMeal}
              thumbnail={recipeData.strMealThumb}
              id={recipeData.idMeal}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecipesList;
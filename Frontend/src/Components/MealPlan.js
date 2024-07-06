import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const mealLabels = ["Breakfast", "Lunch", "Dinner"];
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    targetCalories: 2000,
    diet: '',
    timeFrame: 'day',
    exclude: '',
    targetProtein: '',
    targetFat: '',
    targetCarbs: '',
    includeBreakfast: true,
    includeLunch: true,
    includeDinner: true,
    includeSnack: false,
    allergies: '',
    type: '',
    cuisine: '',
    targetCaloriesMin: '',
    targetCaloriesMax: '',
    number: 3
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/generateMealPlan`, { params: formData });
      setMealPlan(response.data);
      setError(null);
     } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Server Error:', error.response.data);
          setError('Failed to generate meal plan. Server error occurred.');
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Network Error:', error.request);
          setError('Network error. Please check your internet connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message);
          setError('An unexpected error occurred. Please try again later.');
        }
      }
    };
  return (
    <div id="main">
      <div className="inner">
    <header>
          <h1 style={{ color: '#DA7297' }} className="custom-h1">Enjoy balanced, nutritious meals with our daily meal planner.</h1>
          <p className="custom-p">"Enjoy balanced, nutritious meals effortlessly with our daily meal planner. Take the guesswork out of planning and discover delicious recipes tailored to your preferences, ensuring every meal is both healthy and satisfying."</p>
    </header>
    <div className="menu-card">
      <div className="edit-card card mb-4">
        <div className="card-header">
         <div className="card-body">
      <h2>Meal Planner</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-control-file">
          Target Calories:
          <input
            className="form-control"
            type="number"
            name="targetCalories"
            value={formData.targetCalories}
            onChange={handleChange}
          />
        </label>
        <label>
          Diet:
          <input
            type="text"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            placeholder="e.g., vegetarian"
          />
        </label>
        <label>
          Exclude:
          <input
            type="text"
            name="exclude"
            value={formData.exclude}
            onChange={handleChange}
            placeholder="e.g., dairy, nuts"
          />
        </label>
        <label>
          Target Protein (g):
          <input
            type="number"
            name="targetProtein"
            value={formData.targetProtein}
            onChange={handleChange}
          />
        </label>
        <label>
          Target Fat (g):
          <input
            type="number"
            name="targetFat"
            value={formData.targetFat}
            onChange={handleChange}
          />
        </label>
        <label>
          Target Carbs (g):
          <input
            type="number"
            name="targetCarbs"
            value={formData.targetCarbs}
            onChange={handleChange}
          />
        </label>
        <label>
          Allergies:
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="e.g., gluten"
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g., breakfast"
          />
        </label>
        <label>
          Cuisine:
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g., Italian"
          />
        </label>
        <label>
          Target Calories Min:
          <input
            type="number"
            name="targetCaloriesMin"
            value={formData.targetCaloriesMin}
            onChange={handleChange}
          />
        </label>
        <label>
          Target Calories Max:
          <input
            type="number"
            name="targetCaloriesMax"
            value={formData.targetCaloriesMax}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Generate Meal Plan</button>
      </form>
      {error && <p>{error}</p>}
      {mealPlan && (
        <div>
          <h3>Your Generated Meal Plan for Today:</h3>
          <div>
            <h4>Nutrients:</h4>
            <ul>
              <li>Calories: {mealPlan.nutrients.calories.toFixed(2)}</li>
              <li>Protein: {mealPlan.nutrients.protein.toFixed(2)}g</li>
              <li>Fat: {mealPlan.nutrients.fat.toFixed(2)}g</li>
              <li>Carbohydrates: {mealPlan.nutrients.carbohydrates.toFixed(2)}g</li>
            </ul>
          </div>
          <div>
            <h2>Meal Details:</h2>
            <section className="tiles">
            {mealPlan.meals.map((meal, index) => (
  <article key={meal.id} className="style1">
    <div className="image-container">
     <center><h4 className="meal-label">{mealLabels[index]}</h4></center>
      <span className="image square-image">
        <img
          src={`https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`}
          alt={meal.title}
        />
      </span>
    </div>
    <Link to={meal.sourceUrl} target="_blank" rel="noopener noreferrer">
      <h2>{meal.title}</h2>
      <div className="content">
        <p>Ready in: {meal.readyInMinutes} minutes</p>
        <p>Servings: {meal.servings}</p>
        {/* <p>Recipe by <strong style={{ textTransform: 'capitalize' }}>Author Name</strong></p> */}
      </div>
    </Link>
  </article>
))}
          </section>

            {/* <ul>
              {mealPlan.meals.map(meal => (
                <section className="tiles">
                <li key={meal.id}>
                  <img src={`https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`} alt={meal.title} />
                  <div>
                    <h5>{meal.title}</h5>
                    <p>Ready in: {meal.readyInMinutes} minutes</p>
                    <p>Servings: {meal.servings}</p>
                    <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
                  </div>
                </li>
                </section>
              ))}
            </ul> */}
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default MealPlanner;

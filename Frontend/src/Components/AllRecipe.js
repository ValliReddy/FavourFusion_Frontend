import React, { useRef, useState, useEffect, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import CommentSection from './Comments';
import axios from 'axios';
import { RecipeContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { store } from '../App';
import { SearchContext } from '../App';

const All = () => {
  const { recipeID } = useContext(RecipeContext);
  const { setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();
  const componentRef = useRef();
  const [token] = useContext(store);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorID, setAuthorID] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [nutritionData, setNutritionData] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [profileData, setProfileData] = useState({
    username: '',
    followers: '',
    ratings: '',
    about: '',
    profileImage: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      facebook: ''
    }
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followButtonDisabled, setFollowButtonDisabled] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [originalIngredients, setOriginalIngredients] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState();
  
  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/${recipeID}`);
      setRecipe(response.data);
      setAuthorID(response.data.Author);
      setIngredients(response.data.ingredients)
      // console.log(response.data.ingredients)
      if (response.data && response.data.ingredients) {
        const fetchedRecipe = response.data;
        const ingredientsArray2 = fetchedRecipe.ingredients.split('\r\n');
        setRecipeIngredients(ingredientsArray2);
        setOriginalIngredients(ingredientsArray2);
        setLoading(false);
      } else {
        setError('Invalid data received from server');
        setLoading(false);
        console.error('Response data or ingredients array is undefined:', response.data);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      if (authorID) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/edit-profile/${authorID}`);
        setProfileData(response.data);
        setFollowersCount(response.data.followers);
        setIsFollowing(response.data.isFollowing);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFollow = async () => {
    try {
      const storedToken = token || localStorage.getItem('token');

      if (!storedToken) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'x-token': storedToken
        }
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/follow/${authorID}`,
        null,
        config
      );

      if (response.status === 200) {
        setIsFollowing(true);
        setFollowersCount(response.data.followersCount);
        setFollowButtonDisabled(true);
      } else if (response.status === 400 && response.data.message === 'You have already followed this user') {
        console.log('User is already following this profile');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error following profile:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  useEffect(() => {
    if (recipeID) {
      fetchRecipe();
    }
  }, [recipeID]);

  useEffect(() => {
    if (authorID) {
      fetchProfile();
    }
  }, [authorID, isFollowing]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  useEffect(() => {
    const handleRateRecipe = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${recipeID}/rate`, { rating :averageRating });
        console.log('Response:', response.data); // Assuming you want to log the response for now
        // Optionally, you can update UI or show a success message
      } catch (error) {
        console.error('Error rating recipe:', error);
        // Handle error, e.g., show error message to user
      }
    };

    handleRateRecipe(); // Immediately call handleRateRecipe on component mount or when rating changes
  }, [averageRating, recipeID]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={`star-${i}`} className="star">&#9733;</span>);
    }
    return <div className="stars">{stars}</div>;
  };
   
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const recipesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/user/${authorID}`);
        setUserRecipes(recipesResponse.data);
        
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    if (isActive) {
      fetchUserRecipes();
    }
  }, [isActive, authorID]);

  const handleRecipeClick = (recipeName) => {
    navigate('/')
    setSearchQuery(recipeName); // Set searchQuery to the clicked recipe's name
  };

  if (loading) {
    return <p><center><h4>Loading recipe...</h4></center></p>;
  }

  if (error) {
    return <p><center><h4>Error fetching recipe: {error}</h4></center></p>;
  }

  if (!recipe) {
    return <p><center><h4>No recipe found</h4></center></p>;
  }
  const handleGenerateNutrition = async () => {
    setLoading(true);

    // Split the ingredients input into an array based on new lines
    const ingredientsArray = ingredients.split('\n').map(line => line.trim()).filter(line => line !== '');
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/nutrition`, {
            ingredients: ingredientsArray
        });
        setNutritionData(response.data);
        // console.log(response.data)
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
};

const adjustQuantities = (factor) => {
  // console.log(originalIngredients)
  if (factor !== scaleFactor) {
    const adjustedIngredients = originalIngredients.map((ingredient) => {
      const regex = /^([\d./]+)\s/;
      const match = ingredient.match(regex);

      if (match) {
        let quantity = match[1];
        quantity = evaluateFraction(quantity);
        let adjustedValue = quantity;

        if (factor === 0.5) {
          adjustedValue = Math.ceil(quantity / 2);
        } else if (factor === 2) {
          adjustedValue = quantity * 2;
        }

        if (factor === 1) {
          adjustedValue = quantity;
        }

        ingredient = ingredient.replace(regex, adjustedValue + ' ');
      }

      return ingredient;
    });

    setRecipeIngredients(adjustedIngredients);
    setScaleFactor(factor);
  }
};

const evaluateFraction = (fraction) => {
  if (fraction.includes('/')) {
    const [numerator, denominator] = fraction.split('/');
    return parseFloat(numerator) / parseFloat(denominator);
  } else {
    return parseFloat(fraction);
  }
};

  return (
    <div className="container" style={{justifyContent:'center',alignContent:'center'}}>
      <div className="menu-card">
        <div className="card" ref={componentRef}>
          <div className="inner">
            <h1>{recipe.recipeName}</h1>
            <span className="image main">
              <center><img src={recipe.imagePath} alt="Recipe Image" style={{ width: '50%', maxWidth: '700px' }} onError={(e) => console.log('Image Error:', e)} /></center>
            </span>
            <h2 style={{ textAlign: 'left' }}>{renderStars(averageRating)}</h2>
            <div style={{ textAlign: 'right' }}>
        <button onClick={() => adjustQuantities(0.5)} disabled={scaleFactor === 0.5}>
          1/2x
        </button>
        <button onClick={() => adjustQuantities(1)} disabled={scaleFactor === 1}>
          1x
        </button>
        <button onClick={() => adjustQuantities(2)} disabled={scaleFactor === 2}>
          2x
        </button>
      </div>
            <h2>Ingredients:</h2>
            <ul>
              {recipeIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h2>Instructions:</h2>
            <ol>
              {recipe.instructions.split('\r\n').map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="recipe-actions">
          <button className="recipe" onClick={handlePrint}>
            Print Recipe
            </button>
            <button onClick={handleGenerateNutrition} disabled={!ingredients.trim() || loading}>
        {loading ? 'Generating...' : 'Generate Nutritional Facts'}
      </button>

      {error && <p>Error: {error}</p>}
      {nutritionData && (
    <div className="nutrition-info">
        <h2>Nutritional Facts</h2>
        <h8 style={{ fontWeight: 'bold' }}>Calories: {nutritionData.calories.toFixed(2)}</h8>
        <div className="nutrition-table">
            {Object.keys(nutritionData.totalDaily)
                .filter(key => !['THIA', 'RIBF', 'FOLDFE', 'NIA'].includes(key)) // Exclude specific keys
                .map(key => (
                    <div className="nutrition-item" key={key}>
                        <span style={{ fontWeight: 'bold', color: '#A0937D' }}>{nutritionData.totalDaily[key].label}:</span>
                        <span style={{ color: '#A0937D' }}>{nutritionData.totalDaily[key].quantity.toFixed(2)}{nutritionData.totalDaily[key].unit}</span>
                    </div>
                ))}
        </div>
    </div>
)}





          <h2>Leave a comment</h2>
           <CommentSection setAverageRating={setAverageRating} />   {/*imp for passing set of variable to other componenet instead of varaible */}
        </div>
      </div>
      <div className="new-login-container">
      <div className="new-profile-img" style={{ backgroundImage: `url(${profileData.profileImage})` }}></div>
      <h1 className="new-profile-name">
        {profileData.username}
      </h1>
      <div className="new-description">
        {profileData.about}
      </div>
      <div className="new-followers">
      <button onClick={handleFollow} disabled={followButtonDisabled}>
        {isFollowing ? 'Following' : 'Follow'}
      </button>
      </div>
      <div className="new-followers">
        <span className="label">Followers:</span> <span className="value">{profileData.followersCount}</span>
      </div>
      <div className="new-ratings">
        <span className="label">Ratings:</span> <span className="value">{renderStars(profileData.ratings)}</span>
      </div>
      <div className="social-icons">
        <a href={`https://www.instagram.com/${profileData.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram" style={{ color: '#E4405F' }}></i>
        </a>
        <a href={`https://www.twitter.com/${profileData.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter" style={{ color: '#1DA1F2' }}></i>
        </a>
        <a href={`https://www.facebook.com/${profileData.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook" style={{ color: '#1877F2' }}></i>
        </a>
      </div>
      <div className="accordion-item">
      <div className="new-ratings">
        <span onClick={toggleAccordion} className="label">Explore</span> 
      </div>
      {isActive && (
        <div className="accordion-content">
          <p className="new-description"  >Other recipes of {profileData.username} that you make like</p>
          <ul className="new-description">
            {userRecipes
              .filter(recipe => recipe._id !== recipeID)
              .map(filteredRecipe => (
                <li 
                  key={filteredRecipe._id} 
                  className="recipe-item"
                  onClick={() => handleRecipeClick(filteredRecipe.recipeName)}
                > 
                  <img className='new-userecipe-container'
              src={filteredRecipe.imagePath}
              alt={filteredRecipe.recipeName}
            />
                  {filteredRecipe.recipeName}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
    </div>

    </div>
  );
};

export default All;

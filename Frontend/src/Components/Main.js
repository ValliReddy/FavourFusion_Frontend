import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RecipeContext } from '../App';
import { FaSearch,FaMicrophone} from 'react-icons/fa'; // Import search icon
import { SearchContext } from '../App';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MainContent = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { setRecipeID } = useContext(RecipeContext);
  const { searchQuery: contextSearchQuery, setSearchQuery: setContextSearchQuery } = useContext(SearchContext);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes`);
        setRecipes(response.data);
        // console.log(response.data)
        setFilteredRecipes(response.data); // Initialize with all recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };
    fetchRecipes();
  }, []);

  // useEffect(() => {
  //   // Filter recipes based on context search query
  //   const filtered = recipes.filter((recipe) =>
  //     recipe.recipeName.toLowerCase().includes(contextSearchQuery.toLowerCase())
  //   );
  //   setFilteredRecipes(filtered);
  // }, [contextSearchQuery, recipes]);
  useEffect(() => {
    // Filter recipes based on context search query
    const filtered = recipes.filter((recipe) => {
        // Convert recipe object to an array of its values
        const recipeValues = Object.values(recipe);
        
        // Check if any value in the recipe matches the search query
        return recipeValues.some(value => {
            if (typeof value === 'string') {
                // Convert to lowercase for case-insensitive search
                return value.toLowerCase().includes(contextSearchQuery.toLowerCase());
            }
            return false;
        });
    });
    
    setFilteredRecipes(filtered);
}, [contextSearchQuery, recipes]);

  const handleRecipeClick = (id) => {
    setRecipeID(id);
  };

  






  const handleSearch = () => {
    // Update context search query with input search query
    setContextSearchQuery(searchQuery);
  };
  const startListening = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition. Please use a compatible browser.");
      return;
    }
    SpeechRecognition.startListening(); // Start speech recognition
  };

  // Handle transcript when it changes
  useEffect(() => {
    // Update searchQuery state with transcript when transcript changes
    if (transcript && transcript !== searchQuery) {
      setSearchQuery(transcript);
    }
  }, [transcript, searchQuery]);

  const clearSearch = () => {
    // Clear both text input and voice recognition transcript
    setSearchQuery('');
    setContextSearchQuery('');
    resetTranscript();
  };


  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1 className="custom-h1">Find Inspiration for Every Meal with FavourFusion.</h1>
          <p className="custom-p">"Whether you're planning a quick weekday dinner or an extravagant weekend feast, FavourFusion offers a treasure trove of recipes to spark your creativity and satisfy your taste buds. Discover delicious possibilities for breakfast, lunch, dinner, and everything in between."</p>
        </header>
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center' }}>
  <FaMicrophone className="microphone-icon" onClick={startListening} style={{ marginRight: '10px' }} />
  <input
    type="text"
    placeholder="Search for a recipe..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <FaSearch className="search-icon" onClick={handleSearch} style={{ marginRight: '20px', marginLeft: '20px' }} />
  <a className="searchclose"onClick={clearSearch}>x</a>

</div>

<section className="tiles">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <article key={recipe._id} className="style1">
                <span className="image square-image">
                  <img src={recipe.imagePath} alt={recipe.recipeName} />
                </span>
                <Link to="/all" onClick={() => handleRecipeClick(recipe._id)}>
                  <h2>{recipe.recipeName}</h2>
                  <div className="content">
                    {/* <p>
                      Recipe by <strong style={{ textTransform: 'capitalize' }}></strong>
                    </p> */}
                  </div>
                </Link>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default MainContent;

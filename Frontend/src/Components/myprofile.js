import React, { useContext, useState, useEffect } from 'react';
import './Myprofile.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeForm from './RecipeC';
import { store } from '../App';
import '@fortawesome/react-fontawesome';
import ConfirmationDialog from './ConfirmationDialog'; 

const MyProfile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userID, setUserID] = useState(null);
  const [ProfileData, setProfileData] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
  const [recipeToEdit, setRecipeToEdit] = useState(null); // State to hold recipe data for editing
  const [deleteRecipeID, setDeleteRecipeID] = useState(null); // State to hold the ID of recipe to delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedToken = token || localStorage.getItem('token');

        if (storedToken) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/myprofile`, {
            headers: {
              'x-token': storedToken
            }
          });
          setData(response.data);
          // console.log(response.data)
          if (!token) {
            setToken(storedToken);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        navigate('/login');
      }
    };

    fetchData();
  }, [token, navigate, setToken]);

  useEffect(() => {
    if (data) {
      setUserID(data._id);
      // console.log(data._id)

    }
  }, [data]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/edit-profile/${userID}`);
        setProfileData(response.data);
        const recipesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/user/${userID}`);
        setUserRecipes(recipesResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userID) {
      fetchProfile();
    }
  }, [userID]);


  useEffect(() => {
    // Function to calculate average rating
    const calculateAverageRating = () => {
      if (userRecipes.length === 0) {
        setAverageRating(0);
        return;
      }
  
      let totalRating = 0;
      userRecipes.forEach(recipe => {
        totalRating += recipe.ratings; // Assuming each recipe has a 'rating' field
      });
  
      const average = totalRating / userRecipes.length;
      setAverageRating(average);
    };
  
    // Call the calculateAverageRating function whenever userRecipes changes
    calculateAverageRating();
  }, [userRecipes]);
  
  // Render function to display the average rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={`star-${i}`} className="star">&#9733;</span>);
    }
    return <div className="stars">{stars}</div>;
  };

  
  useEffect(() => {
    const handleRateProfile = async () => {
      try {
        // Round off averageRating to 1 decimal place
        const roundedRating = Math.round(averageRating * 10) / 10;
  
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/editprofile/update-ratings`, {
          userID: userID,
          newRating: roundedRating,
        });
  
        console.log('Response:', response.data); // Assuming you want to log the response for now
        // Optionally, you can update UI or show a success message
      } catch (error) {
        console.error('Error rating profile:', error);
        // Handle error, e.g., show error message to user
      }
    };
  
    handleRateProfile(); // Immediately call handleRateProfile on component mount or when rating changes
  }, [averageRating]);


  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const handleRecipe = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setRecipeToEdit(null); // Reset recipeToEdit state when closing form
  };

  const handleEditProfile = () => {
    navigate('/editprofile', { state: { userID: userID, ProfileData: ProfileData} });
  };

  const toggleRecipes = () => {
    setShowRecipes(!showRecipes);
  };

  const handleEditRecipe = async (recipeID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/${recipeID}`);
      const recipeToEdit = response.data;
      setRecipeToEdit(recipeToEdit); // Set recipeToEdit state when editing recipe
      setShowForm(true); // Show the form when editing
    } catch (error) {
      console.error('Error fetching recipe for edit:', error);
    }
  };

  const openDeleteConfirmation = (recipeID) => {
    setDeleteRecipeID(recipeID);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/recipes/${deleteRecipeID}`);
      setUserRecipes(userRecipes.filter(recipe => recipe._id !== deleteRecipeID));
      console.log(`Recipe with ID ${deleteRecipeID} deleted successfully.`);
      setShowDeleteConfirmation(false); // Close confirmation dialog after successful deletion
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };


  return (
    <div className="container">
      <div className="inner">
        <section id="banner">
          <div className="content">
            <header>
              <h1  className="custom-h1">Welcome to Flavour Fusion, {ProfileData.username}!</h1>
              <p className="custom-p">Setup profile here:
                <a 
                  onClick={handleEditProfile} 
                  className="btn-sm btn-block" 
                  style={{ color: '#f56a6a' }}
                >
                  Edit profile
                </a>
              </p>
            </header>
            <p className="custom-p">Welcome to your FavourFusion, where culinary creativity meets community! This is your space to explore, create, and share your favorite fusion recipes. Whether you're combining flavors from around the world or adding your own unique twist to traditional dishes, the possibilities are endless. Dive in and start by creating your own recipes to inspire others. Engage with fellow chefs by commenting on their creations, offering tips, and rating recipes you've tried. Don't forget to explore and follow recipes that pique your interest—you never know what delicious inspiration awaits! Together, let's celebrate the joy of cooking and sharing wonderful flavors.</p>
            <div className="text-center mt-4">
              <button className="button big" onClick={handleRecipe}>Add your own recipe</button>
            </div>
          </div>
          <span className="image object">
            <img src={ProfileData.profileImage} alt="" />
            <div className="text-center mt-6">
              <center>
                <button className="button big"
                  style={{ marginTop: '10px' }} 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </center>
            </div>
          </span>
        </section>
        
        <section>
          <header className="major">
            <h2>Information</h2>
          </header>
          <div className="features">
            <article>
              <span className="icon fas fa-heart"></span>
              <div className="content">
                <h3>Followers</h3>
                <p><strong>{ProfileData.followersCount}</strong></p>
              </div>
            </article>
            <article>
              <span className="icon fas fa-star"></span>
              <div className="content">
                <h3>Ratings</h3>
                <p><strong>{renderStars(averageRating)}</strong></p>
              </div>
            </article>
            <article>
              <span className="icon solid fa-signal"></span> 
              <div className="content">
                <h3>No of recipes</h3>
                <p><strong>{userRecipes.length}</strong></p>
              </div>
            </article>
            {data && (
              <article>
                <span className="icon fas fa-envelope"></span>
                <div className="content">
                  <h3>Email</h3>
                  <p>{data.email}</p>
                </div>
              </article>
            )}
          </div>
        </section>

        <section>
          <header className="major">
            <h2>Your Recipes</h2>
          </header>
          {userRecipes.length > 0 ? (
            <div className="posts">
              {userRecipes.map(recipe => (
                <article key={recipe._id}>
                  <a href="#" className="image">
                    <img 
                      src={recipe.imagePath} 
                      alt="" 
                      style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                  </a>
                  <h3>{recipe.recipeName}</h3>
                  <ul className="actions">
                  <li><a href="#" className="button" onClick={() => handleEditRecipe(recipe._id)}>Edit</a></li>
                    <li><a href="#" className="button" onClick={() => openDeleteConfirmation(recipe._id)}>Delete</a></li>
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <p>No recipes found.</p>
          )}
        </section>

      </div>
      
      {showForm && userID && (
        <div className="overlay">
          <div className="form-container" style={modalPosition}>
            <RecipeForm open={true} userID={userID} setCloseForm={handleCloseForm} recipeToEdit={recipeToEdit} />
          </div>
        </div>
      )}
      
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        message="Are you sure you want to delete this recipe?"
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
      />

    </div>
  );
}

export default MyProfile;

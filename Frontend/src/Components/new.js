// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import RecipeForm from './RecipeC';
// import { store } from '../App';

// const  MyprofileNew = () => {
//   const navigate = useNavigate();
//   const [token, setToken] = useContext(store);
//   const [data, setData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [userID, setUserID] = useState(null);
//   const [ProfileData, setProfileData] = useState('');
//   const [userRecipes, setUserRecipes] = useState([]);
//   const [showRecipes, setShowRecipes] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let storedToken = token || localStorage.getItem('token');
        
//         if (storedToken) {
//           const response = await axios.get("http://localhost:5000/myprofile", {
//             headers: {
//               'x-token': storedToken
//             }
//           });
//           setData(response.data);
//           if (!token) {
//             setToken(storedToken);
//           }
//         } else {
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         navigate('/login');
//       }
//     };

//     fetchData();
//   }, [token, navigate, setToken]);

//   useEffect(() => {
//     if (data) {
//       setUserID(data._id);
//     }
//   }, [data]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/edit-profile/${userID}`);
//         setProfileData(response.data);
//         const recipesResponse = await axios.get(`http://localhost:5000/recipes/user/${userID}`);
//         setUserRecipes(recipesResponse.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     if (userID) {
//       fetchProfile();
//     }
//   }, [userID]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     navigate('/login');
//   };

//   const handleRecipe = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   const handleEditProfile = () => {
//     navigate('/editprofile', { state: { userID: userID, ProfileData: ProfileData } });
//   };

//   const toggleRecipes = () => {
//     setShowRecipes(!showRecipes);
//   };

//   const handleEditRecipe = (recipeID) => {
//     // Add functionality to edit recipe
//     console.log(`Edit recipe with ID: ${recipeID}`);
//   };

//   const handleDeleteRecipe = (recipeID) => {
//     // Add functionality to delete recipe
//     console.log(`Delete recipe with ID: ${recipeID}`);
//   };

//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//       {data && (
//         <div style={{ width: '50%', padding: '40px' }}>
//           <div className="card mb-3" style={{ borderRadius: '.5rem', background: '#fffffb', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}>
//             <div className="row g-0">
//               <div className="col-md-12 text-center text-white mb-3" style={{ background: 'linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))', borderRadius: '.5rem 0 0 .5rem', padding: '20px' }}>
//                 <img src={ProfileData.profileImage} alt="Avatar" className="img-fluid my-3" style={{ width: '120px', borderRadius: '50%' }} />
//                 <center>{ProfileData.username}</center>
//                 <div className="d-flex justify-content-center">
//                   <a href={ProfileData.socialMedia?.facebook} style={{ marginRight: '20px' }}><i className="fab fa-facebook-f fa-lg"></i></a>
//                   <a href={ProfileData.socialMedia?.twitter} style={{ marginRight: '20px' }}><i className="fab fa-twitter fa-lg"></i></a>
//                   <a href={ProfileData.socialMedia?.instagram}><i className="fab fa-instagram fa-lg"></i></a>
//                 </div>
//                 <div className="text-center mt-4">
//                   <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//                   <a onClick={handleEditProfile} className="btn btn-dark btn-sm btn-block">Edit profile</a>
//                 </div>
//               </div>
//               <div className="col-md-12">
//                 <div className="card-body p-4">
//                   <h6>Information</h6>
//                   <p>ID: {data._id}</p>
//                   <hr className="mt-0 mb-4" />
//                   <div className="row pt-1">
//                     <div className="col-6 mb-3">
//                       <h6>Email</h6>
//                       <p className="text-muted">{data.email}</p>
//                     </div>
//                     <div className="col-6 mb-3">
//                       <h6>Recipes</h6>
//                       <p className="text-muted">{ProfileData.recipeCount}</p>
//                     </div>
//                   </div>
//                   <hr className="mt-0 mb-4" />
//                   <div className="row pt-1">
//                     <div className="col-6 mb-3">
//                       <h6>Followers</h6>
//                       <p className="text-muted">{ProfileData.followersCount}</p>
//                     </div>
//                     <div className="col-6 mb-3">
//                       <h6>Ratings</h6>
//                       <p className="text-muted">{ProfileData.ratings}</p>
//                     </div>
//                   </div>
//                   <div className="text-center mt-4">
//                     <button className="btn btn-danger" onClick={handleRecipe}>Add your own recipe</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-body p-4">
//               <h4 className="mt-4">Your Recipes</h4>
//               {showRecipes && (
//                 <div>
//                   {userRecipes.length > 0 ? (
//                     userRecipes.map(recipe => (
//                       <div key={recipe._id} className="card mb-3">
//                         <div className="card-body d-flex justify-content-between align-items-center">
//                           <h5 className="card-title mb-0">{recipe.recipeName}</h5>
//                           <div>
//                             <button className="btn btn-sm btn-primary mr-2" style={{ fontSize: '0.8rem'}} onClick={() => handleEditRecipe(recipe._id)}>Edit</button>
//                             <button className="btn btn-sm btn-danger" style={{ fontSize: '0.8rem'}} onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No recipes found.</p>
//                   )}
//                 </div>
//               )}
//               {!showRecipes && (
//                 <button className="btn btn-primary" onClick={toggleRecipes}>Show Recipes</button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {showForm && userID && (
//         <div style={{ width: '50%', padding: '40px'}}>
//           <div className="card mb-3" style={{ borderRadius: '.5rem', background: '#fffffb', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}>
//             <div className="card-body p-4">
//               <RecipeForm open={true} userID={userID} setCloseForm={handleCloseForm} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyprofileNew;

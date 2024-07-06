// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Newsletter = () => {
//   const [maxRatedRecipe, setMaxRatedRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHighestRatedRecipe = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/highest-rated-recipe'); // Endpoint from backend
//         const highestRatedRecipe = res.data.highestRatedRecipe;
//         setMaxRatedRecipe(highestRatedRecipe);
//       } catch (err) {
//         console.error('Error fetching highest rated recipe', err);
//         setError("Error fetching highest rated recipe. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHighestRatedRecipe();
//   }, []);

//   // Show loading indicator while fetching data
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // Show error message if there's an error
//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       {maxRatedRecipe && <p>Highest Rated: {maxRatedRecipe.recipeName}</p>}
//     </div>
//   );
// };

// export default Newsletter;

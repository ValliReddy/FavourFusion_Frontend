import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header'; // Adjust the import path if necessary
import MainContent from './Components/Main'; // Adjust the import path if necessary
import Footer from './Components/Footer'; // Adjust the import path if necessary
import './App.css'; // Import CSS styles for your components
import SignUp from './Components/signup'; // Adjust the import path if necessary
import Login from './Components/Login';
import Biryani from './Components/Biryani';
import MyProfile from './Components/myprofile';
import All from './Components/AllRecipe';
import EditProfile from './Components/EditProfile';
import Newsletter from './Components/Newsletter';
// import MyprofileNew from './Components/new';
import ForgotPasswordForm from './Components/ForgotPassword';
import ResetPasswordForm from './Components/ResetPassword';




import MealPlanner from './Components/MealPlan';
export const store = createContext();
export const SearchContext = createContext();
export const RecipeContext = createContext();


const App = () => {
  const [token, setToken] = useState(null);
  const [recipeID, setRecipeID] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <div id="wrapper">
        <store.Provider value={[token, setToken]}>
          <RecipeContext.Provider value={{ recipeID, setRecipeID }}>
          <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
           
            <Header token={token} />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/biryani" element={<Biryani />} />
              <Route path="/myprofile" element={<MyProfile/>} />
              <Route path="/all" element={<All />} />
              <Route path="/editprofile" element={<EditProfile/>} />
              <Route path="/forgot-password" element={<ForgotPasswordForm/>} />
              <Route path="/reset-password" element={<ResetPasswordForm/>} />
              <Route path="/news-letter" element={<Newsletter/>} />
              {/* <Route path="/newprofile" element={<MyprofileNew/>} /> */}
              <Route path="/meal-planner" element={<MealPlanner/>} />
             
            </Routes>
            <Footer />
           </SearchContext.Provider>
          </RecipeContext.Provider>
        </store.Provider>
      </div>
    </Router>
  );
};

export default App;

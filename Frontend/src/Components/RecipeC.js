import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeForm = ({ open, userID, setCloseForm, recipeToEdit }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (recipeToEdit) {
            setRecipeName(recipeToEdit.recipeName);
            setIngredients(recipeToEdit.ingredients);
            setInstructions(recipeToEdit.instructions);
        }
    }, [recipeToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('Author', userID);
        formData.append('recipeName', recipeName);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        if (image) {
            formData.append('recipeImage', image);
        }

        try {
            let response;
            if (recipeToEdit) {
                response = await axios.put(`${process.env.REACT_APP_API_URL}/recipes/${recipeToEdit._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post(`${process.env.REACT_APP_API_URL}/submit-recipe`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            console.log(response.data);
            setCloseForm(false);
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleClose = () => {
        setCloseForm(false);
    };

    return (
        <>
            {open && (
                <div className="card">
                <div className="card-body" >
                        <h5 className="card-title">{recipeToEdit ? 'Edit Recipe' : 'Submit Your Recipe'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="recipeName" className="form-label">Recipe Name:</label>
                                <input
                                    type="text"
                                    id="recipeName"
                                    className="form-control"
                                    name="recipeName"
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipeImage" className="form-label">Upload Image:</label>
                                <input
                                    type="file"
                                    id="recipeImage"
                                    className="form-control"
                                    name="recipeImage"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ingredients" className="form-label">Ingredients:(Eg format :1 1/2 cups flour)</label>
                                <textarea
                                    id="ingredients"
                                    className="form-control"
                                    name="ingredients"
                                    rows="5"
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instructions" className="form-label">Instructions:</label>
                                <textarea
                                    id="instructions"
                                    className="form-control"
                                    name="instructions"
                                    rows="5"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">{recipeToEdit ? 'Update' : 'Submit'}</button>
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeForm;

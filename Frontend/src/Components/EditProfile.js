import React, { useState,useContext } from 'react';
import axios from 'axios';
import './Edit.css';
import { useLocation } from 'react-router-dom';



const EditProfile = () => {
    const location = useLocation();
    const { userID,ProfileData } = location.state;
    
    
    

    // State variables
    const [profileImage, setProfileImage] = useState(ProfileData.profileImage || "/images/profile.png");
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [username, setUsername] = useState(ProfileData.username || '');
    const [about, setAbout] = useState(ProfileData.about || '');
    const [facebook, setFacebook] = useState(ProfileData.socialMedia?.facebook || '');
    const [twitter, setTwitter] = useState(ProfileData.socialMedia?.twitter || '');
    const [instagram, setInstagram] = useState(ProfileData.socialMedia?.instagram || '');

    // Handle profile image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
            setProfileImageFile(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('userID', userID);
        if (profileImageFile) {
            formData.append('profileImage', profileImageFile);
        }
        formData.append('username', username);
        formData.append('about', about);
        formData.append('facebook', facebook);
        formData.append('twitter', twitter);
        formData.append('instagram', instagram);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/edit-profile/${userID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Profile updated:', response.data);
            // Optionally, show a success message or redirect
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error, e.g., show an alert or toast message
        }
    };

    return (
        <div className="edit-profile-container container-xl px-4 mt-4">
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="edit-card card mb-4 mb-xl-0">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">
                            <img className="img-account-profile rounded-circle mb-2" src={profileImage} alt="Profile" />
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control-file" />
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="edit-card card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Username</label>
                                    <input
                                        className="form-control"
                                        id="inputUsername"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputAbout">About</label>
                                    <textarea
                                        className="form-control"
                                        id="inputAbout"
                                        placeholder="Tell about yourself"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1">Social Media Links</label>
                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control mb-2"
                                            type="text"
                                            placeholder="Facebook URL"
                                            value={facebook}
                                            onChange={(e) => setFacebook(e.target.value)}
                                        />
                                        <input
                                            className="form-control mb-2"
                                            type="text"
                                            placeholder="Twitter URL"
                                            value={twitter}
                                            onChange={(e) => setTwitter(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Instagram URL"
                                            value={instagram}
                                            onChange={(e) => setInstagram(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button type="submit">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

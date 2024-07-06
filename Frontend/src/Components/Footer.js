// Footer.js
import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';


const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
	const [notificationKey, setNotificationKey] = useState(0);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/newsletter-signup`, { name, email });
            setMessage(response.data.message);
			setNotificationKey(prevKey => prevKey + 1);
            setName('');
            setEmail('');
        } catch (error) {
            setMessage(error.response.data.message);
			setNotificationKey(prevKey => prevKey + 1);
			 // Update to match server response
        }
    };

    return (
        <footer id="footer">
            <div className="inner">
                <section>
                    <h2>Signup for email updates</h2>
                    <h3>Get our top rated recipe</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="field half">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="field half">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <ul className="actions">
                            <li><input type="submit" value="Send" className="primary" /></li>
                        </ul>
                    </form>
                </section>
                <section>
                    <h2>Follow</h2>
                    <ul className="icons">
                        <li><a className="icon brands style2 fa-twitter"><span className="label">Twitter</span></a></li>
                        <li><a className="icon brands style2 fa-facebook-f"><span className="label">Facebook</span></a></li>
                        <li><a className="icon brands style2 fa-instagram"><span className="label">Instagram</span></a></li>
                        <li><a className="icon brands style2 fa-dribbble"><span className="label">Dribbble</span></a></li>
                        <li><a className="icon brands style2 fa-github"><span className="label">GitHub</span></a></li>
                        <li><a className="icon brands style2 fa-500px"><span className="label">500px</span></a></li>
                        <li><a className="icon solid style2 fa-phone"><span className="label">Phone</span></a></li>
                        <li><a className="icon solid style2 fa-envelope"><span className="label">Email</span></a></li>
                    </ul>
                </section>
                <ul className="copyright">
                    <li>&copy; Favour Fusion. All rights reserved</li>
                    <li>Design: <a>Valli Reddy</a></li>
                </ul>
            </div>
            {message && (
                <Notification
				    key={notificationKey}
                    message={message}
                />
            )}
        </footer>
    );
}

export default Footer;

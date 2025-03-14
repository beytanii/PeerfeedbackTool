import './UserProfile.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUserProfile } from '../../utils/getUserProfile';

function UserProfile() {
    const [username, setUsername] = useState(null); // Manage username state
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchUserData = async () => {
            const userProfile = await getUserProfile();
            if (userProfile) {
                setUsername(userProfile.UserName); // Update username from fetched data
            } else {
                console.error("Failed to fetch user profile.");
                alert("Unable to load profile. Redirecting to login.");
                handleLogout();
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        logout({ returnTo: 'https://peerfeedback.betbet.website' });
      };

    if (username) {
        return (
            <div className="userProfile">
                <p>
                    Logged in as <b>{username}</b>
                </p>
                <Link to="https://api.peerfeedback.betbet.website/logout">
                    Logout
                </Link>
            </div>

        )
    } else {

        return (
            <div className="userProfile">
                <p>
                    <Link to="https://api.peerfeedback.betbet.website/login">Not Logged In</Link>
                </p>
            </div>
        )
    }
}

export default UserProfile;
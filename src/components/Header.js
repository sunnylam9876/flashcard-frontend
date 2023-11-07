import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();     //to redirect webpage

    // fetch user login status and username from session
    useEffect(() => {
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName); {
            setUserName(storedUserName);
        }
    }, []);

    const handleLogout = () => {
        // clear the user data from session storage
        sessionStorage.setItem('userName', '');

        navigate('/');
        setTimeout(() => {window.location.reload();}, 200);
    }

    return(
     <header>
        <ul className="main-nav">
            {userName && (<li>Logged in as {userName}</li>)}
            {userName ? (
                    <>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                        <li><NavLink to="/play">Play</NavLink></li>
                    </>
                ) : (
                    <li><NavLink to="/">Login</NavLink></li>
                )}
        </ul>
    </header>
    
    );
};

export default Header;
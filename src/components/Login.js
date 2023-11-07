import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './css/Login.css';



const Login = () => {
    //const apiUrl = 'http://localhost:5000'
    const apiUrl = 'https://flashcard-backend-j9f1.onrender.com'
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    //const history = useHistory();
    const navigate = useNavigate();     //to redirect webpage

    // to handle create account button click
    const handleCreateAccountClick = () => {
        
        const url = apiUrl + '/user/add';

        const queryParams = {
            userId: userName,
            password: password
        };

        axios.post(url, queryParams)
            .then(response => {
                if(response.status === 200) {
                    setLoggedIn(false);  //update login status
                    //sessionStorage.setItem('userName', queryParams.userId);
                    setLoginError('Account created, please login to play');  //clear any pervious error
                }
                /* else {
                    //setLoggedIn(false); //update login status
                    //sessionStorage.setItem('userName', '');
                } */
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setLoginError('Create account error');
                } else {
                    setLoginError('An unexpected error occured');
                }
            });
    };

    const handleLoginClick = () => {
        const url = apiUrl + '/user/login';

        const queryParams = {
            userId: userName,
            password: password
        };

        axios.post(url, queryParams)
            .then(response => {
                if (response.status === 200) {
                    setLoggedIn(true);  //update login status if login successfully
                    sessionStorage.setItem('userName', queryParams.userId);
                    setLoginError('');

                    //if the user is admin, forward to admin page
                    if (queryParams.userId === 'admin') {
                        //console.log("Logged in as Admin");                        
                        navigate('/admin');
                        setTimeout(() => {window.location.reload();}, 200);
                    } else {
                        navigate('/play');
                        setTimeout(() => {window.location.reload();}, 200);
                    }

                } else {
                    setLoggedIn(false)  //update login status if login failed
                    sessionStorage.setItem('userName', '');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setLoginError('Wrong password or user does not exist');
                } else {
                    setLoginError('An unexpected error occured. Please try again.');
                }
            });
    };    

    return (
        <div className="signup_page_body">
          <div className="signup_box ">
            <h2>Log in / Log out</h2>
                <label>User Name</label>
                <input className = 'input_textbox' type="text" id="userName"
                        value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                <label>Password</label>
                <input className='input_textbox' type="password" id="password" 
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
                {loginError && <p className="login-error">{loginError}</p>}
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleCreateAccountClick}>Create account</button>
            </div>    
        </div>
      );
}

export default Login;
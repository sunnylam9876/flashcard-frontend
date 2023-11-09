import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin_WordList from './Admin_WordList';

import './css/Admin.css';

//const url = 'http://localhost:5000';
//const url = 'https://flashcard-backend-j9f1.onrender.com';
const url = 'https://flashcard-backend-six.vercel.app';

const Admin_AddWord = () => {
    const [newWord, setNewWord] = useState('');
    const [wordError, setWordError] = useState('');
    
    //get all the user's name
    const [user, setUser] = useState('');
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(sessionStorage.getItem('selectedUser') || '');

    useEffect(() => {
        axios
            .get(url + '/user/getallusers')
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userList]);

    useEffect(() => {
        // Save selectedUser to localStorage when it changes
        sessionStorage.setItem('selectedUser', selectedUser);
      }, [selectedUser]);
 


    // when a name was selected from the user's list
    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        //sessionStorage.setItem('selectedUser', event.target.value);
        setTimeout(() => {window.location.reload();}, 200);
    };

    // add a word to database
    const onSubmit = (e) => {
        e.preventDefault();
        const newWord_json = {
                                "user": selectedUser,
                                "wordId": newWord
                            };

        axios
            .post(url + '/add', newWord_json)
            .then((res) => {
                // log the return string in the console
                //console.log("Return data: " + res.data);
                //window.location.reload();
                setTimeout(() => {window.location.reload();}, 200);
            })
            .catch((error) => {
                // check if the error response is status 404
                if (error.response.status == 404) {
                    console.log(error.response.data);
                    setWordError("Cannot find this word, please input again.");
                }
                else
                    console.error('Error: ', error);
            });
    };

    return (
        <div>
            {/* user list */}
            {/* <select value={selectedUser} onChange={handleUserChange}>
                        <option value="">Choose a user</option>
                        {userList.map((eachUser) => (
                            <option key={eachUser} value={eachUser}>{eachUser}</option>
                        ))}
            </select> */}
            <div>
                <p>Select a user:</p>
                {userList.map((eachUser) => (
                    <div key={eachUser}>
                        <input
                            type="radio"
                            id={eachUser}
                            name="selectedUser"
                            value={eachUser}
                            checked={selectedUser === eachUser}
                            onChange={handleUserChange}
                        />
                        <label htmlFor={eachUser}>{eachUser}</label>
                    </div>
                ))}
                <p>{selectedUser}</p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Word: </label>
                    <input
                        type="text"
                        requiredclassName="form-control"
                        name="inputWord"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit();
                            }
                          }}
                    />
                    <input
                        type="submit"    
                        value="Add"
                        className="btn btn-primary"
                    />
                    {wordError && <p className="word_error">{wordError}</p>}
                </div>
            </form>
            <Admin_WordList selectedUser = {selectedUser}/>
        </div>
      );
}

export default Admin_AddWord;
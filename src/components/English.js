import EnglishCardList from './EnglishCardList';
import words from './words';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css'

function English() {
  //const url = 'http://localhost:5000';
  const url = 'https://flashcard-backend-j9f1.onrender.com'
  //const [wordsData, setWordsData] = useState(words);
  
  // get user name
  const [userName, setUserName] = useState('');   

  // fetch user login status and username from session storage
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // get word list by user name
  const [wordRecord, setWordRecord] = useState([]);
  useEffect(() => {
      axios
          .get(url + '/getwordbyuser/' + userName)
          .then((response) => {
              setWordRecord(response.data);
          })
          .catch((error) => {
              //console.log(error);
          });
  }, [userName]);

  return (
    <div>
      <h3>Hello! {userName}</h3>
      <EnglishCardList words = {wordRecord} />
    </div>
  );
}

export default English;
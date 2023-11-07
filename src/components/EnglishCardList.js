import React from 'react';
import EnglishCard from './EnglishCard';
import './css/Card.css';

// generate a random array for picture
function generateRandomArray(i, n) {
  if (i <= 0 || n <= 0 || i > n) {
    return [];
  }

  const randomArray = [];
  const availableNumbers = Array.from({ length: n }, (_, index) => index + 1);

  for (let j = 0; j < i; j++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers.splice(randomIndex, 1)[0];
    randomArray.push(randomNumber);
  }

  return randomArray;
}

const EnglishCardList = ({ words }) => {
  const i = words.length;   // number of word cards
  const n = 50; // random number from 1 to n
  const randomArray = generateRandomArray(i, n);
  
  //console.log(randomArray);

  // Shuffle the 'words' array to create 'random_words'
  const random_words = [...words];
  for (let i = random_words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [random_words[i], random_words[j]] = [random_words[j], random_words[i]];
  }

  return (
    <div className='cardContainer'>
      {random_words.map((word, index) => (  // use randomized words
        <EnglishCard 
            key={word._id}
            id={randomArray[index]}   //use the number from random array
            user={word.user}
            wordid={word.wordId}
            audio={word.audio}/>
      ))}
    </div>
  );
}

export default EnglishCardList;

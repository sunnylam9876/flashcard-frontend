import React from 'react';
import {useState, useEffect} from 'react';
//import logo from './img/logo.svg';
//import imageOne from './img/1.png';
import './css/Card.css';

//const images = require.context('./img', true);


const EnglishCard = (props) => {

  const [audioElement, setAudioElement] = useState(null);
    //const [id, setId] = useState('');

    // function to play sound
    const playSound = () => {
        if (audioElement) {
            audioElement.play();
        }
    };

  useEffect(() => {
    if (props.audio) {
        let firstChar = props.audio.charAt(0);
        const firstCharAsInteger = parseInt(firstChar, 10); //convert to integer using base 10
            if (!isNaN(firstCharAsInteger)) {
                firstChar = 'number';   //if the audio tag started with a number, set firstChar to 'number'
            }
        const audioUrl = 'https://media.merriam-webster.com/audio/prons/en/us/mp3/' + firstChar + '/' + props.audio + '.mp3'
        const audio = new Audio(audioUrl);
        setAudioElement(audio);
        //console.log(audioUrl);
    }
}, [props.audio]);

  const [wordSubmit, setWordSubmit] = useState('');
  const [checkCorrect, setCheckCorrect] = useState('');

  const handleWordSubmit = () => {
    //alert(wordSubmit);
    const submittedWord = wordSubmit.toLowerCase();
    if (submittedWord === props.wordid) {
      setCheckCorrect("correct");
      //alert(checkCorrect);
    } else {
      setCheckCorrect("wrong");
      //alert(checkCorrect);
    }
  }

  const [wordPeek, setWordPeek] = useState('false');
  const handlePeek = () => {
    setWordPeek(true);
  }

  return (
    <div className='card'>
      <img 
        className='card_img' 
        src={require(`./img/${props.id}.png`)}
        alt={'Card ${props.id}'}
        onClick={playSound} //   
      />
      {(wordPeek == true) && <div>{props.wordid}</div>}

{/*       <p>word: {props.wordid}</p>
      <p>user: {props.user}</p>        
      <p>audio: {props.audio}</p> */}
      <div>
        <input className = 'input_textbox' type="text" id="wordSubmit"
                          value={wordSubmit} onChange={(e) => setWordSubmit(e.target.value.trim())}   //trim the input
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {    //detect 'Enter'
                              handleWordSubmit();
                            }
                          }}
                          ></input>
        <button onClick={handleWordSubmit}>Check</button>
        <button onClick={handlePeek}>Peek</button>
        
        
      </div>
      <div>
        {(checkCorrect == 'correct') && <img className='correct' src={require('./img/tick.png')} ></img>}
        {(checkCorrect == 'wrong') && <img className='correct' src={require('./img/cross.png')} ></img>}
      </div>

    </div>
  );
}

export default EnglishCard;

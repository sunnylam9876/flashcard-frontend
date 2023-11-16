import React, { useState, useEffect } from 'react';

import './css/Admin.css';
import axios from 'axios';

//twoods9876
//LDwdKVW7suXOXXp5
//mongodb+srv://twoods9876:LDwdKVW7suXOXXp5@cluster0.nqmpo3r.mongodb.net/

// each word component
//const url = 'http://localhost:5000';
//const url = 'https://flashcard-backend-j9f1.onrender.com'
const url = 'https://flashcard-backend-six.vercel.app';



const EachWord = (props) => {
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

    // function to delete word
    const deleteWord = () => {
        /*
          const deleteWord_json = {
            id: props.id
        }; */

        axios
            .delete(url + '/delete', { data: {id: props.id}})
            //.delete('http://localhost:5000/delete', deleteWord_json)  //this statement cannot work in axios
                                                                        //Axios handles DELETE requests differently when you pass data in the request body compared to 
                                                                        //when you use the data option. Axios uses the data option for POST and PUT requests 
                                                                        //but expects parameters to be passed in the URL for DELETE requests.

            .then((res) => {
            // log the return string in the console
                console.log("Return data: " + res.data);
                
                //window.location.reload();
                setTimeout(() => {window.location.reload();}, 200);
            })
            .catch((error) => {
                // check if the error response is status 404
                if (error.response.status == 404) {
                    console.log(error.response.data);
                    //setWordError("Cannot find this word, please input again.");
                }
                else
                    console.error('Error: ', error);
        }); 
    }
    
    return (
        <tr>
            <td>{props.user}</td>
            <td>{props.wordid}</td>
            {/* <td>{props.id}</td> */}
            <td>
                <button onClick={playSound}>Play Sound</button>
                <button onClick={deleteWord}>Delete</button>
            </td>
        </tr>
    );    
};


const Admin_WordList = (props) => {
    // get all words created for selectedUser
    //let selectedUser = sessionStorage.getItem('selectedUser');
    let selectedUser = props.selectedUser;
    const [wordRecord, setWordRecord] = useState([]);
    useEffect(() => {
        axios
            .get(url + '/getwordbyuser/' + selectedUser)
            .then((response) => {
                setWordRecord(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    return (
        <div>
            <h3>Word List:</h3>           
            

            <table className='word_table'>
                <tbody>
                    {wordRecord.map((word) => {
                        return (
                            <EachWord 
                                key={word._id}
                                id={word._id}
                                user={word.user}
                                wordid={word.wordId}
                                audio={word.audio}
                            />   
                        );
                    })}
                </tbody>
            </table>
        </div>
      );
}

export default Admin_WordList;
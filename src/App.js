//import EnglishCardList from './components/EnglishCardList';
import English from './components/English';
//import words from './components/words';
import Header from './components/Header';
import Login from './components/Login';
import Admin from './components/Admin';
import Admin_AddWord from './components/Admin_AddWord';
import Admin_WordList from './components/Admin_WordList';
import Play from './components/Play';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import './App.css';


function App() {
  //const [wordsData, setWordsData] = useState(words);

  return (
    <div className="App">
      <Header />
      {/* <English /> */}
      {/* <Login /> */}
      {/* <Admin /> */}
      {/* <Admin_AddWord /> */}
      {/* <Admin_WordList /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/play' element={<Play />} />
        <Route path='/english' element={<English />} />
      </Routes>
    </div>
  );
}

export default App;
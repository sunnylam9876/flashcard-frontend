import React, {useState, useEffect} from 'react';
import Admin_AddWord from './Admin_AddWord';


const Admin = () => {
  const [userName, setUserName] = useState('');

  // fetch user login status and username from session storage
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  
    return (
        <div>
          {userName === 'admin' ?
           (<Admin_AddWord />): 
           (<h1>Please log in as admin</h1>)}
        </div>
      );
}

export default Admin;


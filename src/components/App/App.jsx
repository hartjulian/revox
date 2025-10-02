import { useState, useEffect } from 'react'
import './App.css'
import reddit from '../../utils/reddit.js';
import Header from '../Header/Header.jsx';
import Feed from '../Feed/Feed.jsx';
import Login from '../Login/Login.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkLogin, setCheckLogin] = useState(true);

  // Check if user is already logged in, or in auth callback flow
  useEffect(() => {
    if (!loggedIn && checkLogin) {
      checkLoginStatus();
      setCheckLogin(false);
    }
  }, [checkLogin])

  const checkLoginStatus = async() => {
    setLoggedIn(await reddit.checkLogin());
  };

  const handleLogin = () => {
    reddit.login();
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      {loggedIn ? <Feed /> : <Login onClick={handleLogin}/>}
    </>
  )
}

export default App;

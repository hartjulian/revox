import { useState } from 'react'
import './App.css'
import reddit from '../../utils/reddit.js';
import Header from '../Header/Header.jsx';
import Feed from '../Feed/Feed.jsx';
import Login from '../Login/Login.jsx';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    reddit.getUserAuth();
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      {loggedIn ? <Feed /> : <Login onClick={handleLogin}/>}
    </>
  )
}

export default App;

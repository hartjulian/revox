import { useState, useEffect } from 'react'
import './App.css'
import reddit from '../../utils/reddit.js';
import Header from '../Header/Header.jsx';
import Feed from '../Feed/Feed.jsx';
import Login from '../Login/Login.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkLogin, setCheckLogin] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [fetchMorePosts, setFetchMorePosts] = useState(true);
  const [subreddit, setSubreddit] = useState();
  const [postsData, setPostsData] = useState([]);


  // Check if user is already logged in, or in auth callback flow
  useEffect(() => {
    if (!loggedIn && checkLogin) {
      checkLoginStatus();
      setCheckLogin(false);
    };
    setFetchMorePosts(loggedIn);
  }, [checkLogin])

  useEffect(() => {
    if (loggedIn && fetchMorePosts) {
      setFetchingPosts(true);
      getPosts();
      setFetchMorePosts(false);
      setFetchingPosts(false);
    };
  }, [loggedIn, fetchMorePosts])

  const getPosts = async () => {
    const posts = await reddit.getPosts(subreddit);
    if (posts.length > 0) {
      setPostsData([]);     
      posts.forEach(post => {
        setPostsData((prev) => [...prev, {
          title: post.data.title,
          permalink: post.data.permalink,
          author: post.data.author,
          subreddit: post.data.subreddit,
          imageUrl: (post.data.preview ? post.data.preview.images[0].source.url : null),
          selftext: post.data.selftext
        }]);
      });
    }
  }

  const checkLoginStatus = async () => {
    setLoggedIn(await reddit.checkLogin());
  };

  const handleLogin = () => {
    reddit.login();
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      {loggedIn ? <Feed postsData={postsData} /> : <Login onClick={handleLogin} />}
    </>
  )
}

export default App;

import { useState, useEffect } from 'react'
import './App.css'
import reddit from '../../utils/reddit.js';
import Header from '../Header/Header.jsx';
import Feed from '../Feed/Feed.jsx';
import Login from '../Login/Login.jsx';
import SubredditList from '../SubredditList/SubredditList.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkLogin, setCheckLogin] = useState(true);
  const [currentSubreddit, setCurrentSubreddit] = useState();
  const [subredditsData, setSubredditsData] = useState([]);
  const [postsData, setPostsData] = useState([]);


  // Check if user is already logged in, or in auth callback flow
  useEffect(() => {
    if (!loggedIn && checkLogin) {
      checkLoginStatus();
      setCheckLogin(false);
    };
  }, [checkLogin]);

  useEffect(() => {
    if (loggedIn && subredditsData.length === 0) {
      getSubreddits();
    };
  }, [loggedIn, subredditsData]);

  useEffect(() => {
    if (loggedIn && currentSubreddit) {
      setPostsData([]);
      getPosts();
    };
  }, [loggedIn, currentSubreddit]);

  useEffect(() => {
    if (typeof(currentSubreddit) === "undefined") {
      setCurrentSubreddit(subredditsData[0]);
    };
  }, [subredditsData]);

  const getSubreddits = async () => {
    const subreddits = await reddit.getSubreddits();
    if (subreddits.length > 0) {
      subreddits.forEach(subreddit => {
        setSubredditsData((prev) => [...prev, {
          displayName: subreddit.data.display_name,
          iconImg: (subreddit.data.icon_img ? subreddit.data.icon_img : null),
          title: subreddit.data.title
        }]);
      });
    };
  };

  const getPosts = async () => {
    const posts = await reddit.getPosts(currentSubreddit.displayName);
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
    };
  };

  const checkLoginStatus = async () => {
    setLoggedIn(await reddit.checkLogin());
  };

  const handleLogin = () => {
    reddit.login();
  };

  const handleLogout = () => {
    reddit.logout();
    checkLoginStatus();
  };  

  const selectSubreddit = (subreddit) => {
    setCurrentSubreddit(subreddit);
  };

  return (
    <>
      <Header loggedIn={loggedIn} logoutClick={handleLogout}/>
      {!loggedIn &&<Login onClick={handleLogin} />}
      <div className='grid-container'>
          {loggedIn && <Feed postsData={postsData} />}
          {loggedIn && <SubredditList subredditsData={subredditsData} onClick={selectSubreddit} currentSubreddit={currentSubreddit}/>}
      </div>
    </>
  )
}

export default App;

import './SubredditList.css';
import Subreddit from '../Subreddit/Subreddit.jsx';

function SubredditList( { subredditsData, onClick, currentSubreddit } ) {

    return (
        <div className='subreddits-container' >
            <h2 className='subreddits-heading'>Subreddits</h2>
            {subredditsData.map((subreddit, index) => {
                return <Subreddit subreddit={subreddit} key={index} onClick={onClick} isCurrent={subreddit === currentSubreddit} />
            })}
        </div>
    );
};

export default SubredditList;
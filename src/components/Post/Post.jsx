import './Post.css';
const redditUrl = 'https://www.reddit.com';

function Post({ post }) {

    //TODO - self text should be formatted correctly, e.g. \n in selftext should appear as a new <p>

    return (
        <div className='post'>
            <h2 className='title'><a href={`${redditUrl}${post.permalink}`} target='_blank'>{post.title}</a></h2>
            {(post.imageUrl) && <div className='image-container'><img src={post.imageUrl.replace(/&amp;/g, '&')} /></div>}
            {(post.selftext) && <p className='selftext'>{post.selftext.replace(/&amp;/g, '&')}</p>}
            <div className='post-details'>
                <div className='subreddit'><a href={`${redditUrl}/r/${post.subreddit}`} target='_blank'>{`r/${post.subreddit}`}</a></div>
                <div className='author'><a href={`${redditUrl}/u/${post.author}`} target='_blank'>{`u/${post.author}`}</a></div>
            </div>
        </div>
    );
}

export default Post;
import './Post.css';
import TextRenderer from '../../utils/TextRenderer';
const redditUrl = 'https://www.reddit.com';

function Post({ post }) {

    //TODO - handle markdown for URLs (e.g. [Google](https://google.com) correctly)

    return (
        <div className='post'>
            <h2 className='title'><a href={`${redditUrl}${post.permalink}`} target='_blank'>{post.title}</a></h2>
            {(post.imageUrl) && <div className='image-container'><img src={post.imageUrl.replace(/&amp;/g, '&')} alt={post.title} /></div>}
            {/* {(post.selftext) && post.selftext.split('\n').map((line, i) => (<p key={i} className='selftext'>{line.replace(/&amp;/g, '&')}</p>))} */}
            {(post.selftext) && <TextRenderer text={post.selftext}  paragraphClass='selftext' />}
            <div className='post-details'>
                <div className='subreddit'><a href={`${redditUrl}/r/${post.subreddit}`} target='_blank'>{`r/${post.subreddit}`}</a></div>
                <div className='author'><a href={`${redditUrl}/u/${post.author}`} target='_blank'>{`u/${post.author}`}</a></div>
            </div>
        </div>
    );
}

export default Post;
import Post from '../Post/Post.jsx';
import './Feed.css';

function Feed( {postsData} ) {
    console.log(postsData);
    return (
        <div className='posts-container'>
            {(postsData.length === 0) && <h2>Loading posts!</h2>}
            
            {postsData.map((post, index) => {
                return <Post post={post} key={index}/>;
            })}
        </div>
    );
}

export default Feed;
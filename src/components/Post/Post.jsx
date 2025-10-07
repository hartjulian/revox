import './Post.css';

function Post({ post }) {
    console.log(`post ${post}`);
    return (
        <div className='post'>
            <h4>{post.title}</h4>
            <p>{post.author}</p>
        </div>
    );
}

export default Post;
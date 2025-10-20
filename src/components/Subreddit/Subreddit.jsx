import './Subreddit.css';

function Subreddit( {subreddit, onClick, isCurrent} ) {

    const handleClick = () => {
        onClick(subreddit);
    }

    return (
        <div className={"subreddit-container " + (isCurrent ? 'active' : 'inactive')} onClick={handleClick}>
            {subreddit.iconImg && <img className="subreddit-icon-img" src={subreddit.iconImg} alt={subreddit.title} />}
            {!subreddit.iconImg && <p className="subreddit-icon-img">{subreddit.displayName[0]}</p>}
            <h4 className="subreddit-name">{subreddit.displayName}</h4>
        </div>
    )
};

export default Subreddit
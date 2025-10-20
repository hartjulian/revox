import './Logout.css';

function Logout({ onClick }) {
    return (
        <div className="logout-container">
            <input type="button" name="logout-btn" id="logout-btn" value="Log Out" onClick={onClick}></input>
        </div>
    );
};

export default Logout;
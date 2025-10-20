import './Login.css';

function Login({ onClick }) {
    return (
        <div className="login-container">
            <input type="button" name="login-btn" id="login-btn" value="Log In using Reddit" onClick={onClick}></input>
        </div>
    );
};

export default Login;
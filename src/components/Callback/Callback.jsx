import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

function Callback() {
    const urlLocation = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(urlLocation.search);

    const state = params.get('state');
    const authCode = params.get('code');
    const error = params.get('error');
    localStorage.setItem('stateReceived', state);
    localStorage.setItem('authCode', authCode);

    useEffect(() => {
        if (error === null) {
            navigate('/');
        }
    }, [urlLocation, state, authCode, error]);

    if (error === null) {
        return <h2>Authenticating ... Please wait</h2>
    } else {
        return (
            <div>
                <h2>Error authenticating to Reddit!</h2>
                <p>{`State: ${state}`}</p>
                <p>{`Auth Code: ${authCode}`}</p>
                <p>{`Error: ${error}`}</p>
            </div>)
    };
}

export default Callback;
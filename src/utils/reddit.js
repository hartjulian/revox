import { v4 as uuidv4 } from 'uuid';

const clientId = 'AsA36dL8zPz-szB5VNadnw';
const secret = 'gjwco40-tDx4EimGWIQTNS_FhiDcSg';
const redirectUri = 'http://localhost:5173/callback';
const authUrl = new URL(`https://www.reddit.com/api/v1/authorize?`);
const scopesString = 'identity read';

const reddit = {
    // log in using OAuth
    getUserAuth() {
        const randomString = uuidv4();
        localStorage.setItem('stateSent', randomString);
        const params = {
            client_id: clientId,
            response_type: 'code',
            state: randomString,
            redirect_uri: redirectUri,
            duration: 'temporary',
            scope: scopesString,
        };
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    },
    login() {
        this.getUserAuth();
    },
    async checkLogin() {
        //check local storage for valid access token or refresh token
        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
        const stateSent = localStorage.getItem('stateSent');
        const stateReceived = localStorage.getItem('stateReceived');
        // const refreshToken = localStorage.getItem('refreshToken');  
        // Not currently using refresh token.  Change duration in auth params to permanent to receive a refresh token from OAuth.
        if (accessToken === null || accessToken === undefined) {
            //  no access token found.  Check if in callback, and get access token.
            if (stateReceived === stateSent && stateReceived !== null && stateReceived !== undefined) {
                const authCode = localStorage.getItem('authCode');
                const accessTokenUrl = 'https://www.reddit.com/api/v1/access_token';
                const payload = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Basic ' + btoa(`${clientId}:${secret}`)
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: authCode,
                        redirect_uri: redirectUri
                    }),
                }
                try {
                    const auth_token_response = await fetch(accessTokenUrl, payload);
                    if (auth_token_response.status === 200) {
                        const json_auth_token_response = await auth_token_response.json();
                        const now = new Date();
                        const newTokenExpires = new Date(now.getTime() + (json_auth_token_response.expires_in * 1000));
                        localStorage.setItem('accessToken', json_auth_token_response.access_token);
                        localStorage.setItem('accessTokenExpiry', newTokenExpires);
                        return true;
                    };

                } catch(e) {
                    window.alert(e)
                };
            };
            return false;
        } else {
            // access token exists.  Check if it's expired
            const now = new Date();
            if (now > new Date(accessTokenExpiry)) {
                return false;
            }
            return true;
        }
    }
};

export default reddit;
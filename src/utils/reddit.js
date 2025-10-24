import { v4 as uuidv4 } from 'uuid';

const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
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
            duration: 'permanent',
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
        const accessTokenUrl = 'https://www.reddit.com/api/v1/access_token';
        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
        const stateSent = localStorage.getItem('stateSent');
        const stateReceived = localStorage.getItem('stateReceived');
        const refreshToken = localStorage.getItem('refreshToken');
        // Not currently using refresh token.  Change duration in auth params to permanent to receive a refresh token from OAuth.
        if (accessToken === null || accessToken === undefined) {
            //  no access token found.  Check if in callback, and get access token.
            if (stateReceived === stateSent && stateReceived !== null && stateReceived !== undefined) {
                const authCode = localStorage.getItem('authCode');
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
                        localStorage.setItem('refreshToken', json_auth_token_response.refresh_token);
                        // remove auth code and associated attributes from local storage now that they have been used
                        localStorage.removeItem('authCode');
                        localStorage.removeItem('stateReceived');
                        localStorage.removeItem('stateSent');
                        return true;
                    };
                } catch (e) {
                    window.alert(e)
                };
            };
            return false;
        } else {
            // access token exists.  Check if it's expired
            const now = new Date();
            if (now > new Date(accessTokenExpiry)) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('accessTokenExpiry');
                if (refreshToken === null || refreshToken === undefined) {
                    //  access token expired and refresh token can't be found.  User will need to re-authenticate
                    return false;
                } else {
                    //  access token has expired, and refresh token exists.  Try to refresh access token using refresh token.
                    const payload = {
                        method: 'POST',
                        headers: {
                            Authorization: 'Basic ' + btoa(`${clientId}:${secret}`)
                        },
                        body: new URLSearchParams({
                            grant_type: 'refresh_token',
                            refresh_token: refreshToken
                        }),
                    }
                    try {
                        const refresh_token_response = await fetch(accessTokenUrl, payload);
                        if (refresh_token_response.status === 200) {
                            const json_refresh_token_response = await refresh_token_response.json();
                            const now = new Date();
                            const newTokenExpires = new Date(now.getTime() + (json_refresh_token_response.expires_in * 1000));
                            localStorage.setItem('accessToken', json_refresh_token_response.access_token);
                            localStorage.setItem('accessTokenExpiry', newTokenExpires);
                            localStorage.setItem('refreshToken', json_refresh_token_response.refresh_token);
                            return true;
                        };
                    } catch (e) {
                        window.alert(e)
                    };
                    return false;
                }
            } else {
                // access token exists and hasn't expired.  Happy days!
                return true;
            }
        };
    },
    async getPosts(subreddit) {
        const accessToken = localStorage.getItem('accessToken');
        const listingsUrl = `https://oauth.reddit.com/r/${subreddit}`;
        const payload = {
            method: 'GET',
            headers: {
                Authorization: `bearer ${accessToken}`,
            },
        }
        try {
            const response = await fetch(listingsUrl, payload);
            if (response.status === 200) {
                const responseBody = await response.json();
                return responseBody.data.children;
            }
        } catch (e) {
            //  something went wrong.  Return empty array and handle in calling routine.
            console.log('Something went wrong!');
            return [];
        }
    },
    async getSubreddits() {
        const accessToken = localStorage.getItem('accessToken');
        const subredditUrl = 'https://oauth.reddit.com/subreddits/popular';
        const payload = {
            method: 'GET',
            headers: {
                Authorization: `bearer ${accessToken}`,
            },
        }
        try {
            const response = await fetch(subredditUrl, payload);
            if (response.status === 200) {
                const responseBody = await response.json();
                return responseBody.data.children;
            }
        } catch (e) {
            //  something went wrong.  Return empty array and handle in calling routine.
            console.log('Something went wrong!');
            return [];
        }
    },
    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiry');
        localStorage.removeItem('refreshToken');
    }
}

export default reddit;
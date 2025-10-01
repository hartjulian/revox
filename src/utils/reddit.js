const clientId = 'AsA36dL8zPz-szB5VNadnw';
const secret = 'gjwco40-tDx4EimGWIQTNS_FhiDcSg';
const redirectUri = 'http://localhost:5173/';
const baseAuthURL = `https://www.reddit.com/api/v1/authorize?`;
const scopesString = "identity read"

const reddit = {
    // log in using OAuth
    getUserAuth() {
        const randomString = "1234"; //TODO - generate a random string each time, and store it for validation check
        const authUrl = `${baseAuthURL}client_id=${clientId}&response_type=code&state=${randomString}&redirect_uri=${redirectUri}&duration=permanent&scope=${scopesString}`;
        // TODO - make this individual params and use URLSearchParams?? or something
    }
};

export default reddit;
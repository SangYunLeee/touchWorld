export default function authHeader() : {'x-access-token' : string} {
    const user = JSON.parse(localStorage.getItem('user') as 'string');
    if (user && user.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken };
    } else {
        throw "there is no user or accessToken";
    }
}
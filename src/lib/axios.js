import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/api/',
    //'https://naughty-bat-spacesuit.cyclic.app/api/'
    // http://localhost:3000
});
import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-builder-3757c.firebaseio.com/'
})

export default  instance;
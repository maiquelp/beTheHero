import axios from 'axios';

const api = axios.create({
    baseURL: 'https://warm-temple-94106.herokuapp.com' // 'http://localhost:3333'
})

export default api;
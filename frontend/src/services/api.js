import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3333' : 'https://warm-temple-94106.herokuapp.com' // || 'http://localhost:3333' //'https://warm-temple-94106.herokuapp.com' 
})

export default api;
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3333' || 'https://warm-temple-94106.herokuapp.com' });

console.log(api.baseURL)

export default api;
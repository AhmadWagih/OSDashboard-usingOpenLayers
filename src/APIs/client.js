import  axios from 'axios';

const baseURL = "https://localhost:7292/api";   // 44396 - 7292

const client = axios.create({baseURL,setTimeout:20000});

export default client;
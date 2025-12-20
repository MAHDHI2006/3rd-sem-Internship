const API_BASE_URL = import.meta.env.PROD 
  ? 'https://threerd-sem-internship-6.onrender.com'
  : 'http://localhost:8001';

console.log('API_BASE_URL:', API_BASE_URL);

export default API_BASE_URL;
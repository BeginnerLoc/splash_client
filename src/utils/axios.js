import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://aec9-111-65-61-27.ngrok.io', // Replace with your Flask server's API endpoint
  timeout: 5000, // Adjust this as needed
});

export default axiosInstance;

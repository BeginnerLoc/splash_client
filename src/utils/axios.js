import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cb8b-203-125-116-194.ngrok-free.app', // Replace with your Flask server's API endpoint
  timeout: 5000, // Adjust this as needed
});

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://5af9-203-125-116-194.ngrok.io', // Replace with your Flask server's API endpoint
  timeout: 5000, // Adjust this as needed
});

export default axiosInstance;

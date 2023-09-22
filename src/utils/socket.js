import io from 'socket.io-client';
import BASE_URL from './config';

const socket = io(BASE_URL); // Replace with your Flask server's IP and port

export default socket;

import io from 'socket.io-client';

const socket = io('https://cb8b-203-125-116-194.ngrok-free.app'); // Replace with your Flask server's IP and port

export default socket;

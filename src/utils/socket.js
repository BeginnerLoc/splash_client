import io from 'socket.io-client';

const socket = io('https://b491-203-125-116-194.ngrok-free.app'); // Replace with your Flask server's IP and port

export default socket;

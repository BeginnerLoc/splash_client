import io from 'socket.io-client';

const socket = io('https://ffa6-203-125-116-194.ngrok.io'); // Replace with your Flask server's IP and port

export default socket;

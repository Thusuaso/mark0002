import { io } from 'socket.io-client';
export default (context, inject) => {
  const socket = {
    //socketIO: io('http://localhost:5001'),
    socketIO: io('https://real-time-mark0002.mekmar.com'),
        headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  // Inject $hello(msg) in Vue, context and store.
  inject('socket', socket)
  // For Nuxt <= 2.12, also add 👇
  context.$socket = socket;
}
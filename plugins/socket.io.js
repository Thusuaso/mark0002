import { io } from 'socket.io-client';
export default (context, inject) => {
  // const socket = {
  //   // socketIO: io('http://localhost:3002'),
  //   socketIO: io('https://socket-io.mekmar.com'),
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       cors:{
  //         origin: '*'
  //       }
  //   }
  // // Inject $hello(msg) in Vue, context and store.
  // inject('socket', socket)
  // // For Nuxt <= 2.12, also add 👇
  // context.$socket = socket;
}
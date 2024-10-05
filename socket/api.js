const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { 
    cors: {
        origin: "*"
      }
});
io.on("connection", (socket) => {
  socket.on("cards_update_emit",()=>{
    socket.broadcast.emit("cards_update_on");
  });
  socket.on('supplier_list_emit',()=>{
    socket.broadcast.emit("supplier_list_on")
  });
  socket.on('production_update_emit',()=>{
    socket.broadcast.emit("production_update_on")
  });
  socket.on('offers_updated_emit',()=>{
    socket.broadcast.emit("offers_updated_on");
  });
  socket.on('offers_deleted_emit',()=>{
    socket.broadcast.on('offers_deleted_on');
  });
  socket.on('customer_list_emit',()=>{
    socket.broadcast.on("customer_list_on")
  });

});

httpServer.listen(3001);
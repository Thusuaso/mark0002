import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

// CORS ayarları Nuxt ile bağlantı kurabilmek için kritiktir
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Bağlantı gerçekleştiğinde
io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı: " + socket.id);

  // İstemciden mesaj al
  socket.on("update_production_emit", () => {
    // Herkese (bağlı tüm cihazlara) geri gönder
    io.emit("update_production_on");
  });

  socket.on("production_save_emit", () => {
    io.emit("production_save_on");
  });
  socket.on("card_list_update_emit", () => {
    io.emit("card_list_update_on");
  });

  // Bağlantı koptuğunda
  socket.on("disconnect", () => {
    console.log("Kullanıcı ayrıldı.");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket sunucusu ${PORT} portunda çalışıyor.`);
});

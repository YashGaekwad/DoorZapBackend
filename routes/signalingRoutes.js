const socketHandler = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
  
      socket.on("offer", (data) => {
        const { to, offer } = data;
        socket.to(to).emit("offer", { from: socket.id, offer });
      });
  
      socket.on("answer", (data) => {
        const { to, answer } = data;
        socket.to(to).emit("answer", { from: socket.id, answer });
      });
  
      socket.on("ice-candidate", (data) => {
        const { to, candidate } = data;
        socket.to(to).emit("ice-candidate", { from: socket.id, candidate });
      });
  
      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  };
  
  module.exports = socketHandler;
  
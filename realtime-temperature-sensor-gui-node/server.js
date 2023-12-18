const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT1 = process.env.PORT1 || 3001;
const PORT2 = process.env.PORT2 || 3002;
const PORT3 = process.env.PORT3 || 3003;

app.get("/", (req, res) => {
  res.send("Server is running.");
});

let sensorsData = [];

function updateTemperature() {
  setInterval(() => {
    sensorsData.forEach((sensor) => {
      const temperature = Math.random() * 20 + 20;
      sensor.temperature = temperature;

      io.emit("temperatureUpdate", { sensorId: sensor.id, temperature });
    });
  }, 2000);
}

server.listen(PORT1, () => {
  console.log(`Server is running on port ${PORT1}`);
});

const server2 = http.createServer(app);
const io2 = socketIO(server2);

server2.listen(PORT2, () => {
  console.log(`Server is running on port ${PORT2}`);
});

const server3 = http.createServer(app);
const io3 = socketIO(server3);

server3.listen(PORT3, () => {
  console.log(`Server is running on port ${PORT3}`);
});

for (let i = 1; i <= 6; i++) {
  const sensorId = `sensor${i}Progress`;
  sensorsData.push({
    id: sensorId,
    number: i,
    temperature: 0,
  });
}

updateTemperature();

app.use("/public", express.static("public"));

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.emit("initialData", sensorsData);

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

//const port = process.env.PORT || 3000;
//server.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
//});

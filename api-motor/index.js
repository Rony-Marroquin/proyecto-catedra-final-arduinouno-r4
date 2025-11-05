import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const IP_ARDUINO = "192.168.1.104"; // Tu Arduino

// Obtener distancia
app.get("/sensor", async (req, res) => {
  try {
    const response = await fetch(`http://${IP_ARDUINO}/sensor`);
    const data = await response.json();
    res.json(data);
  } catch {
    res.json({ distancia: 0 });
  }
});

// Control motor
app.post("/motor/:comando", async (req, res) => {
  const comando = req.params.comando;
  let urlArduino = `http://${IP_ARDUINO}/motor/${comando}`;
  if (comando === "auto") {
    urlArduino = req.body.auto ? `http://${IP_ARDUINO}/motor/auto/on` : `http://${IP_ARDUINO}/motor/auto/off`;
  }

  try {
    const response = await fetch(urlArduino, { method: "POST" });
    const text = await response.text();
    res.send(`Arduino respondió: ${text}`);
  } catch {
    res.status(500).send("No se pudo enviar comando al Arduino");
  }
});

app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));

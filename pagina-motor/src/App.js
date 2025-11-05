import { useEffect, useState } from "react";

function App() {
  const [distancia, setDistancia] = useState(0);
  const [auto, setAuto] = useState(false);
  const API_URL = "http://localhost:3000"; // Tu API Node.js

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/sensor`);
        const data = await res.json();
        setDistancia(data.distancia);
      } catch (err) {
        console.error(err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const enviarComando = async (comando) => {
    try {
      if (comando === "auto") {
        const nuevoAuto = !auto;
        setAuto(nuevoAuto);
        await fetch(`${API_URL}/motor/${comando}`, {
          method: "POST",
          body: JSON.stringify({ auto: nuevoAuto }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch(`${API_URL}/motor/${comando}`, { method: "POST" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      textAlign: "center",
      marginTop: "40px",
      fontFamily: "Arial, sans-serif",
    }}>
      {/* 🏆 Escudo del Barcelona */}
      <img
        src="/escudo_barcelona.png" // ← coloca la imagen en public/
        alt="Escudo del Barcelona"
        style={{ width: "120px", marginBottom: "20px" }}
      />

      {/* 📏 Lector del sensor */}
      <h1 style={{ color: "#222" }}>Distancia: {distancia} cm</h1>

      {/* ⚙️ Botones del motor */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => enviarComando("derecha")} style={botonEstilo}>Derecha</button>
        <button onClick={() => enviarComando("izquierda")} style={botonEstilo}>Izquierda</button>
        <button onClick={() => enviarComando("detener")} style={botonEstilo}>Detener</button>
        <button onClick={() => enviarComando("auto")} style={botonEstilo}>
          {auto ? "Desactivar Auto" : "Activar Auto"}
        </button>
      </div>

      {/* 👥 Integrantes */}
      <h2 style={{ marginTop: "50px" }}>Integrantes del Proyecto</h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px",
        marginTop: "20px"
      }}>
        {/* Cada integrante */}
        <div style={cardEstilo}>
          <img src="img/rony.jpg" alt="Integrante 1"
            style={fotoEstilo} />
          <p><strong>Apellido:</strong> Martínez</p>
        </div>

        <div style={cardEstilo}>
          <img src="/integrante2.jpg" alt="Integrante 2"
            style={fotoEstilo} />
          <p><strong>Apellido:</strong> López</p>
        </div>

        <div style={cardEstilo}>
          <img src="/integrante3.jpg" alt="Integrante 3"
            style={fotoEstilo} />
          <p><strong>Apellido:</strong> García</p>
        </div>

        <div style={cardEstilo}>
          <img src="/integrante4.jpg" alt="Integrante 4"
            style={fotoEstilo} />
          <p><strong>Apellido:</strong> Pérez</p>
        </div>
      </div>
    </div>
  );
}

/* --- 🎨 Estilos Reutilizables --- */
const botonEstilo = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#004aad",
  color: "white",
  cursor: "pointer",
};

const cardEstilo = {
  width: "160px",
  textAlign: "center",
  backgroundColor: "#f1f1f1",
  borderRadius: "15px",
  padding: "10px",
  boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
};

const fotoEstilo = {
  width: "100%",
  height: "150px",
  borderRadius: "10px",
  objectFit: "cover",
};

export default App;

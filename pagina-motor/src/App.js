import { useEffect, useState } from "react";
import rony from "./img/rony.jpeg";
import cristina from "./img/cristina.jpeg";
import daniela from "./img/daniela.jpeg";
import omar from "./img/omar.jpeg";
import barca from "./img/barca.png";


function App() {
  const [distancia, setDistancia] = useState(0);
  const [auto, setAuto] = useState(false);
  const API_URL = "http://localhost:3000"; 

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
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1> CONTROL DE MOTOR Y SENSOR WIFI  </h1>

   
      <img
        src={barca} 
        alt="Escudo del Barcelona"
        style={{ width: "120px", marginBottom: "20px" }}
      />

      <h2 style={{ color: "#222" }}>Distancia: {distancia} cm</h2>

    
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => enviarComando("derecha")} style={botonEstilo}>
          Derecha
        </button>
        <button onClick={() => enviarComando("izquierda")} style={botonEstilo}>
          Izquierda
        </button>
        <button onClick={() => enviarComando("detener")} style={botonEstilo}>
          Detener
        </button>
        <button onClick={() => enviarComando("auto")} style={botonEstilo}>
          {auto ? "Desactivar Auto" : "Activar Auto"}
        </button>
      </div>

     
      <h2 style={{ marginTop: "50px" }}>Integrantes del Proyecto</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <div style={cardEstilo}>
          <img src={rony} alt="Rony" style={fotoEstilo} />
          <p><strong></strong> Rony Stanley Marroquin Erroa</p>
          <p><strong></strong> ME141299</p>
        </div>

        <div style={cardEstilo}>
          <img src={cristina} alt="Cristina" style={fotoEstilo} />
         <p><strong></strong> Omar  Arturo Maldonado Guzman</p>
          <p><strong></strong> MG220764</p>
        </div>

        <div style={cardEstilo}>
          <img src={daniela} alt="Daniela" style={fotoEstilo} />
          <p><strong></strong> Daniela Beatriz Cruz Paredes</p>
          <p><strong></strong> CP200009</p>
        </div>

        <div style={cardEstilo}>
          <img src={omar} alt="Omar" style={fotoEstilo} />
          <p><strong></strong> Cristina Aracely Perez Lue</p>
          <p><strong></strong> PL240092</p>
          
        </div>
      </div>
    </div>
  );
}


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

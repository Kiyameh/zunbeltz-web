import React, { useState } from "react";

const LogoPlaygroundFinal = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Tus 5 Favoritas
  const favorites = [
    {
      name: "Grenze Gotisch",
      family: "'Grenze Gotisch', cursive",
      desc: "TOP 5: Tensión, rotura y estilo gótico moderno.",
    },
    {
      name: "Ruslan Display",
      family: "'Ruslan Display', cursive",
      desc: "TOP 5: Rúnica, afilada y decorativa.",
    },
    {
      name: "Bungee",
      family: "'Bungee', cursive",
      desc: "TOP 5: Verticalidad urbana y peso máximo.",
    },
    {
      name: "Righteous",
      family: "'Righteous', cursive",
      desc: "TOP 5: Fluidez tecnológica y moderna.",
    },
    {
      name: "New Rocker",
      family: "'New Rocker', cursive",
      desc: "TOP 5: Agresividad, roca y estética Heavy.",
    },
  ];

  // 15 Nuevas en la misma línea
  const newProposals = [
    {
      name: "Metamorphous",
      family: "'Metamorphous', cursive",
      desc: "Fusión de roca y letras antiguas. Mística.",
    },
    {
      name: "Pirata One",
      family: "'Pirata One', cursive",
      desc: "Gótica condensada. Recuerda a espadas o picos.",
    },
    {
      name: "Uncial Antiqua",
      family: "'Uncial Antiqua', cursive",
      desc: "Estilo Celta/Leyenda. Ideal para el nombre Zunbeltz.",
    },
    {
      name: "Metal Mania",
      family: "'Metal Mania', cursive",
      desc: "Afilada y moderna. Estilo rockero limpio.",
    },
    {
      name: "Fjalla One",
      family: "'Fjalla One', sans-serif",
      desc: "Vertical y rotunda. Un clásico de montaña.",
    },
    {
      name: "Piedra",
      family: "'Piedra', cursive",
      desc: "Textura irregular. Literalmente parece roca tallada.",
    },
    {
      name: "Trade Winds",
      family: "'Trade Winds', cursive",
      desc: "Desgastada por el clima. Aventura ruda.",
    },
    {
      name: "Germania One",
      family: "'Germania One', cursive",
      desc: "Híbrido: Estructura moderna, alma gótica.",
    },
    {
      name: "Carter One",
      family: "'Carter One', cursive",
      desc: "Pulp Adventure. Gruesa con detalles sutiles.",
    },
    {
      name: "Amarante",
      family: "'Amarante', cursive",
      desc: "Espinas y curvas. Elegancia vegetal peligrosa.",
    },
    {
      name: "Sancreek",
      family: "'Sancreek', cursive",
      desc: "Exploración s.XIX. Curvas ornamentales fuertes.",
    },
    {
      name: "Eater",
      family: "'Eater', cursive",
      desc: "Salvaje. Raíces, hongos y puntas. Muy 'cueva'.",
    },
    {
      name: "Rye",
      family: "'Rye', cursive",
      desc: "Bloque rústico. Presencia ancha y sólida.",
    },
    {
      name: "Aclonica",
      family: "'Aclonica', sans-serif",
      desc: "La prima de Righteous. Tech amable.",
    },
    {
      name: "Poller One",
      family: "'Poller One', cursive",
      desc: "Semi-serifa gruesa. Impacto y legibilidad.",
    },
  ];

  return (
    <section className={`playground-container ${darkMode ? "dark" : "light"}`}>
      <style>{`
        /* Import Masivo (20 fuentes) */
        @import url('https://fonts.googleapis.com/css2?family=Aclonica&family=Amarante&family=Bungee&family=Carter+One&family=Eater&family=Fjalla+One&family=Germania+One&family=Grenze+Gotisch:wght@600&family=Metal+Mania&family=Metamorphous&family=New+Rocker&family=Piedra&family=Pirata+One&family=Poller+One&family=Righteous&family=Ruslan+Display&family=Rye&family=Sancreek&family=Trade+Winds&family=Uncial+Antiqua&display=swap');

        .playground-container {
          min-height: 100vh;
          padding: 2rem;
          font-family: system-ui, sans-serif;
          transition: background 0.3s, color 0.3s;
        }

        .playground-container.dark {
          background-color: #121212;
          color: #f0f0f0;
          --card-bg: #1e1e1e;
          --border: #333;
          --accent: #ff4757;
        }

        .playground-container.light {
          background-color: #f0f2f5;
          color: #1a1a1a;
          --card-bg: #ffffff;
          --border: #ddd;
          --accent: #2ed573;
        }

        .header-area {
          margin-bottom: 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          color: inherit;
          cursor: pointer;
          border-radius: 6px;
        }

        .section-title {
          font-size: 1.2rem;
          margin: 3rem 0 1.5rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--border);
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.7;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .card {
          background-color: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
        }

        .logo-display {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-bottom: 1rem;
        }

        .logo-text {
          font-size: 3rem;
          margin: 0;
          line-height: 1;
          white-space: nowrap;
        }
        
        /* Ajuste para fuentes muy grandes */
        .resize { font-size: 2.5rem; }

        .font-name {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .desc {
          font-size: 0.9rem;
          line-height: 1.4;
          opacity: 0.8;
        }

        /* Indicador de Top 5 */
        .top-badge {
          background: var(--accent);
          color: white;
          font-size: 0.6rem;
          padding: 2px 6px;
          border-radius: 4px;
          position: absolute;
          top: 10px;
          right: 10px;
          font-weight: bold;
        }
      `}</style>

      <div className="header-area">
        <div>
          <h1 style={{ margin: 0 }}>Logo Lab: La Selección Final</h1>
          <p style={{ margin: "0.5rem 0 0 0", opacity: 0.6 }}>
            Estilos: Gótico, Rúnico, Roca & Tech
          </p>
        </div>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Modo Claro" : "🌑 Modo Oscuro"}
        </button>
      </div>

      {/* TUS FAVORITAS */}
      <div className="section-title">Tus Top 5 Actuales</div>
      <div className="grid">
        {favorites.map((font) => (
          <div
            key={font.name}
            className="card"
            style={{ borderColor: "var(--accent)", borderWidth: "2px" }}
          >
            <div className="logo-display">
              <h2 className="logo-text" style={{ fontFamily: font.family }}>
                Zunbeltz
              </h2>
            </div>
            <span className="font-name">{font.name}</span>
            <p className="desc">{font.desc}</p>
          </div>
        ))}
      </div>

      {/* NUEVAS PROPUESTAS */}
      <div className="section-title">Nuevas Candidatas (Vibe Místico/Roca)</div>
      <div className="grid">
        {newProposals.map((font) => (
          <div key={font.name} className="card">
            <div className="logo-display">
              <h2
                className={`logo-text ${font.name === "Eater" || font.name === "Piedra" ? "resize" : ""}`}
                style={{ fontFamily: font.family }}
              >
                Zunbeltz
              </h2>
            </div>
            <span className="font-name">{font.name}</span>
            <p className="desc">{font.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoPlaygroundFinal;

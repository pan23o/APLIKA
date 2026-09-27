"use client";

import { useState } from "react";

const features = [
  { icon: "▣", title: "Exámenes reales", text: "Practica con simulacros de 30 preguntas y controla tu tiempo." },
  { icon: "✓", title: "Aprende de tus fallos", text: "Revisa tus respuestas y entiende por qué una opción es correcta." },
  { icon: "◉", title: "Progreso personal", text: "Consulta cómo avanzas por temas y qué necesitas reforzar." }
];

export default function Home() {
  const [dark, setDark] = useState(true);

  return (
    <main className={dark ? "site dark" : "site light"}>
      <nav className="nav">
        <a className="brand" href="#">
          <span className="brandMark">L</span>
          <span>APLIKA</span>
        </a>
        <div className="navLinks">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#precio">Precio</a>
          <button className="themeButton" onClick={() => setDark(!dark)} aria-label="Cambiar tema">
            {dark ? "☀" : "☾"}
          </button>
          <button className="loginButton">Iniciar sesión</button>
        </div>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">PREPÁRATE PARA EL TEÓRICO</span>
          <h1>Aprende. Practica.<br /><strong>Aprueba.</strong></h1>
          <p>APLIKA convierte la preparación del permiso de conducir en un proceso claro, práctico y centrado en lo que necesitas mejorar.</p>
          <div className="heroActions">
            <button className="primary">Empezar gratis <span>→</span></button>
            <a className="secondary" href="#como-funciona">Ver cómo funciona</a>
          </div>
          <div className="trust"><span>✓</span> Un pequeño test gratuito para empezar</div>
        </div>
        <div className="heroVisual" aria-label="Lika, mascota de APLIKA">
          <div className="sun"></div>
          <div className="lika">L</div>
          <div className="bubble">¡Vamos a por el teórico!</div>
        </div>
      </section>

      <section id="como-funciona" className="section">
        <div className="sectionHead"><span className="eyebrow">TODO EN UN SOLO SITIO</span><h2>Estudia a tu ritmo.</h2></div>
        <div className="featureGrid">
          {features.map((f) => <article className="feature" key={f.title}><span className="featureIcon">{f.icon}</span><h3>{f.title}</h3><p>{f.text}</p></article>)}
        </div>
      </section>

      <section className="examPreview">
        <div><span className="eyebrow">TU PRIMER PASO</span><h2>Haz un test y descubre dónde estás.</h2><p>Empieza con 15 preguntas gratuitas. Después podrás continuar con todo el sistema de preparación de APLIKA.</p><button className="primary">Hacer test gratis →</button></div>
        <div className="cardMock"><div className="mockTop"><span>APLIKA</span><span>Pregunta 7 / 15</span></div><div className="mockQuestion">¿Qué debes hacer ante una señal de STOP?</div><div className="answer">A. Reducir la velocidad</div><div className="answer selected">B. Detenerte completamente</div><div className="answer">C. Continuar si no viene nadie</div></div>
      </section>

      <section id="precio" className="pricing"><span className="eyebrow">SIN SUSCRIPCIONES</span><h2>Un pago. Acceso permanente.</h2><p>La versión premium desbloqueará la preparación completa de APLIKA.</p><div className="priceCard"><span>APLIKA Premium</span><strong>Acceso permanente</strong><small>Pago único · sin renovaciones</small><button className="primary">Ver Premium →</button></div></section>

      <footer><div className="brand"><span className="brandMark">L</span><span>APLIKA</span></div><span>© 2026 APLIKA</span></footer>
    </main>
  );
}
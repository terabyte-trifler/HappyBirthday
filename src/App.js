import React, { useEffect, useState } from 'react';
import './App.css';
import './hero.css';
import './flipclock.css';
import './balloons.css';
import './ScrollArrow.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const colors = ['yellow', 'green', 'blue', 'red', 'purple'];

const FlipUnit = ({ label, value }) => (
  <div className="flip-unit">
    <div className="flip-card">
      <span className="top">{value}</span>
      <span className="bottom">{value}</span>
    </div>
    <span className="flip-label">{label}</span>
  </div>
);

function App() {
  const [time, setTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [balloons, setBalloons] = useState([]);
  const [showBalloons, setShowBalloons] = useState(false);

  useEffect(() => {
    const target = new Date("2025-05-23T22:25:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = target - now;
      if (distance < 0) distance = 0;

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });

      if (d === 0 && h === 0 && m === 0 && s === 0) {
        setShowBalloons(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showBalloons) return;
    const interval = setInterval(() => {
      const newBalloon = {
        id: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * window.innerWidth,
        duration: 5 + Math.random() * 4
      };
      setBalloons(prev => [...prev, newBalloon]);
      setTimeout(() => {
        setBalloons(prev => prev.filter(b => b.id !== newBalloon.id));
      }, 8000);
    }, 300);
    return () => clearInterval(interval);
  }, [showBalloons]);

  return (
    <>
      <LazyLoadImage
        src="/M1.jpeg"
        alt="Background"
        effect="blur"
        className="background-image"
      />

      <div className="hero">
        <div className="overlay"></div>

        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          {balloons.map(b => (
            <div
              key={b.id}
              className={`balloon ${b.color}`}
              style={{
                left: `${b.left}px`,
                animation: `float ${b.duration}s ease-in forwards`
              }}>
              <div className="string"></div>
            </div>
          ))}
        </div>

        <div className="content z-50">
          <h1 className="title">
            <span style={{ color: 'white' }}>Happy Birthday </span>
            <span className="highlight">Mithi!</span>
          </h1>
          <p className="countdown-title">BIRTHDAY COUNTDOWN...</p>
          <div className="countdown">
            <FlipUnit label="DAYS" value={time.days} />
            <FlipUnit label="HOURS" value={time.hours} />
            <FlipUnit label="MINUTES" value={time.minutes} />
            <FlipUnit label="SECONDS" value={time.seconds} />
          </div>
        </div>

        <a href="#section2" className="scroll-down" aria-label="Scroll to next section">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <section id="section2" className="hero">
        <div className="overlay"></div>
        <div className="content">
          <h2 style={{ fontSize: '2rem' }}>Another section using the same background</h2>
        </div>
      </section>
    </>
  );
}

export default App;

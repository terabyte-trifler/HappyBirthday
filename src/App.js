import React, { useEffect, useState } from 'react';
import './hero.css';
import './flipclock.css';
import './ScrollArrow.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
  const [time, setTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const target = new Date("2025-07-07T00:00:00").getTime();
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
        seconds: String(s).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <div className="content">
          <h1 className="title">
            Happy Birthday <span className="highlight">Mithi!</span>
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
      </section>
    </>
  );
}

export default App;

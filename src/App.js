import React, { useEffect, useState } from 'react';
import './App.css';
import './hero.css';
import './flipclock.css';
import './balloons.css';
import './ScrollArrow.css';
import './ImageSliderPage.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const slides = [
  {
    id: 1,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/ChatGPT%20Image%20Apr%204%2C%202025%2C%2001_11_13%20PM.png',
    title: 'The first day',
    description: 'An amazing day full of joy and laughter.'
  },
  {
    id: 2,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/WhatsApp%20Image%202025-03-10%20at%2019.56.55%20(1).jpeg',
    title: 'Memory Two',
    description: 'We walked through the old city streets like locals.'
  },
  {
    id: 3,
    img: 'https://example.com/photo3.jpg',
    title: 'Memory Three',
    description: 'Captured moments at the beach during sunset.'
  }
];

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
  const [current, setCurrent] = useState(0);
  const colors = ['yellow', 'green', 'blue', 'red', 'purple'];

  useEffect(() => {
    const target = new Date("2025-07-07T22:25:00").getTime();
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

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

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
          <span></span><span></span><span></span>
        </a>
      </div>

      <section id="section2" className="slider-container">
        <div className="slider-image">
          <img src={slides[current].img} alt={slides[current].title} />
        </div>
        <div className="slider-content">
          <h2>{slides[current].title}</h2>
          <p>{slides[current].description}</p>
          <div className="slider-controls">
            <button onClick={prevSlide} aria-label="Previous slide">
              &#x276E;
            </button>
            <button onClick={nextSlide} aria-label="Next slide">
              &#x276F;
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

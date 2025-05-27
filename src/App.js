import React, { useEffect, useState, useRef } from 'react';
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
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/1.HEIC',
    title: 'Where it all started',
    description: 'First photo of you in my phone -- that walk, that laugh -- yaad aaya kuch?'
  },
  {
    id: 2,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/ChatGPT%20Image%20Apr%204%2C%202025%2C%2001_11_13%20PM.png',
    title: 'The First Hug',
    description: 'We hugged there — same spot where you park. Felt like time parked too.'
  },
  {
    id: 3,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/FD63F76C-D23F-4760-B019-AC3FED499B1A.jpg',
    title: 'The OG one',
    description: 'Play (Sohne Lagde by Sidhu Moosewala) Ab to aaya hoga Yaad :D'
  }
  ,
  {
    id: 4,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_5323.PNG',
    title: 'The Geek Mode',
    description: 'Tu specs mein zyada achi lagti h tbh'
  }
  ,
  {
    id: 4,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_5367.HEIC',
    title: 'The First Kiss',
    description: 'First time we kissed aisa laga tu khaa hi jayegi mujhe :D. Lol it went for 40 min ig '
  },
  {
    id: 5,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_5345.HEIC',
    title: 'Expressions.exe',
    description: 'Tu aur tere expressions — full drama pack.'
  },
  {
    id: 6,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_5360.HEIC',
    title: 'Glowmates',
    description: 'We chase light — morning to dusk. I just dont chase shade Okay ?'
  },
  {
    id: 7,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_5398.jpg',
    title: 'My fav ❤️',
    description: 'If I had to frame just one — this.'
  },
  {
    id: 7,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG-20250121-WA0015.jpg',
    title: 'Laddoo Phase',
    description: 'Bachpan mein cute thi, ab toh... danger zone 😏'
  },

  {
    id: 8,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG-20250425-WA0021(1).jpg',
    title: 'Tiny Trouble',
    description: 'Wisdom baby edition: Bachpan mein hi itni cunning thi… ab toh kya hi kehna 😏'
  },


  {
    id: 9,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_0763.HEIC',
    title: 'Waiting Game',
    description: 'Bas kar yaar… aur kitna wait karwayegi? Aaja ab. Ek hug 🤗 toh dede'
  },

  {
    id: 10,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/ChatGPT%20Image%20Apr%204%2C%202025%2C%2005_10_21%20PM.png',
    title: 'Dr. Sahab',
    description: 'Yaar jab mai tere college aaya tha… tune mere teeth clean kiye the. Best day tha — of course, tere liye nahi… mere daant saaf ho gaye 😭🪥😂'
  },

  {
    id: 11,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_0868.JPG',
    title: 'Good Morning!',
    description: 'Kabhi good morning aata tha — photo attached. Ab toh silence hi deliver hoti hai'
  },
 
  {
    id: 12,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_0839.HEIC',
    title: 'Sunlight on your lips',
    description: 'You smiled there. I’ve been returning to that moment ever since.'
  },

  {
    id: 13,
    img: 'https://pub-3067eb012cf34f2bb7662d7f11dc9a25.r2.dev/IMG_0906%20(1).HEIC',
    title: 'n The last one',
    description: 'Kamla Nehru Park is peace. But that one Omkareshwar— that’s etched forever.'
  },

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
  const [isHovered, setIsHovered] = useState(false);
  const colors = ['yellow', 'green', 'blue', 'red', 'purple'];
  const autoplayRef = useRef(null);

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

  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % slides.length);
      }, 8000);
    };
  
    if (!isHovered) {
      startAutoplay();
    }
  
    return () => clearInterval(autoplayRef.current);
  }, [isHovered]);
  

  const nextSlide = () => {
    clearInterval(autoplayRef.current);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    clearInterval(autoplayRef.current);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
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

      <section
        id="section2"
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="slider-image fade">
          <img src={slides[current].img} alt={slides[current].title} />
        </div>
        <div className="slider-content">
          <h2>{slides[current].title}</h2>
          <p>{slides[current].description}</p>
        </div>
      </section>
    </>
  );
}

export default App;

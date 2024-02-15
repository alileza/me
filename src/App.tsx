import { useState, useEffect } from 'react';
import './App.css';
import { TrackGoogleAnalyticsEvent } from './GA';

function App() {
  const [count, setCount] = useState(0);
  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    function handleResize() {
      setOrientation(getOrientation());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getOrientation() {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }
  
  const handleOnClick = () => {
    const newX = Math.random() * (window.innerWidth - 200); // Adjust 200 according to logo width
    const newY = Math.random() * (window.innerHeight - 200); // Adjust 200 according to logo height
    setPosition({ x: newX, y: newY });
    setCount(count + 1);
    TrackGoogleAnalyticsEvent('avatar', 'click');
    playRandomSound(); // Call function to play random sound
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Array containing the URLs of the sound tracks
  const soundTracks = [
    'https://cdn.alileza.me/public/disable-sound.mp3',
    'https://cdn.alileza.me/public/glug-a.mp3',
    'https://cdn.alileza.me/public/bite.mp3'
  ];

  // Function to select a random sound track
  const getRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * soundTracks.length);
    return soundTracks[randomIndex];
  };

  // Function to play a random sound
  const playRandomSound = () => {
    const randomSound = new Audio(getRandomSound());
    randomSound.play();
  };

  return (
    <div className={`container ${orientation}`}>
      <a href="https://blog.alileza.me" className="logo-container" style={{ position: 'absolute' }}>
        <img draggable="false" src="https://cdn.alileza.me/public/avatar.png" className="logo" alt="Blog" />
      </a>
      <a onClick={handleOnClick} className="logo-container react-container" style={{ position: 'absolute', left: position.x, top: position.y }}>
        <img draggable="false" src="https://cdn.alileza.me/public/avatar.png" className="logo react" alt="Me" />
      </a>
      <div style={{fontSize: window.innerHeight/2, boxShadow: '10px', opacity: '0.1', zIndex: -9999}} className="counter">{count}</div>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import './LandingPage.css';
import speech from '../audio/landingpage/welcometodovekings.mp3'; // Importing the audio file

const LandingPage = () => {
  const { isDarkMode } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      audioRef.current.play()
        .then(() => setIsPlaying(true)) // Update state if audio plays successfully
        .catch((error) => {
          console.log('User interaction required to play audio');
        });
    };

    // Play the audio automatically when the page loads
    playAudio();

    // Event listener to detect when the audio has ended
    const handleAudioEnd = () => {
      setIsPlaying(false); // Update state when audio ends
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('ended', handleAudioEnd);

    // Cleanup event listener on component unmount
    return () => {
      audioElement.removeEventListener('ended', handleAudioEnd);
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="animated-background">
        <div className="gradient-overlay"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="abstract-element top-left"></div>
      <div className="abstract-element bottom-right"></div>

      <div className="main-content">
        <h1 className="title">Welcome to DoveKings</h1>
        <p className="subtitle">Interact with our AI to explore the site just click the microphone button 
            and speak to it
        </p>
        <p className="description">To here instructions again 
            click the play audio button</p>
        <button
          onClick={toggleAudio}
          className={`audio-button ${isDarkMode ? 'dark' : 'light'}`}
        >
          {isPlaying ? 'Pause AI Voice' : 'Play AI Voice'}
        </button>
        
        
      </div>
      <div></div>

      <audio ref={audioRef} src={speech} loop={false} /> {/* Loop is disabled */}
    </div>
  );
};

export default LandingPage;

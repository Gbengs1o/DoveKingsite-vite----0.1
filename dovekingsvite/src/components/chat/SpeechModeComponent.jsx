import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import styled, { keyframes, css } from 'styled-components';

const defaultLottieUrl = 'https://lottie.host/da9d6b11-4527-4926-9cfb-ef2f14a4dc6e/oLIsfRxVVz.json';
const recordingLottieUrl = 'https://lottie.host/7c3cf898-90c2-4e50-912f-355854d80e2f/ttvPqUU66v.json';
const loadingLottieUrl = 'https://lottie.host/37413ed6-4910-47ab-800c-4f848bda0063/zDoP5HKcoh.json';
const playbackLottieUrl = 'https://lottie.host/91c17c58-e9d5-40bb-b410-c4cc51623885/SB25S1YNl4.json';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;

  ${props => props.$isScrolling && css`
    opacity: 0.3;
  `}
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
`;

const StyledAudioPlayer = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in;
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease;
`;

const SwitchButton = styled.button`
  position: fixed;
  bottom: ${props => (props.$hasAudio ? '180px' : '120px')};
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 15px;
  background-color: #8B5CF6;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
  z-index: 1000;

  &:hover {
    opacity: 1;
  }
`;

const SpeechModeComponent = ({ 
  isRecording, 
  handleToggleRecording, 
  audioSrc, 
  setIsLoading, 
  isLoading,
  mode,
  handleModeSwitch
}) => {
  const [lottieUrl, setLottieUrl] = useState(defaultLottieUrl);
  const [currentAudioSrc, setCurrentAudioSrc] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      setLottieUrl(recordingLottieUrl);
      setCurrentAudioSrc(null);
    } else if (isLoading) {
      setLottieUrl(loadingLottieUrl);
    } else if (currentAudioSrc) {
      if (audioRef.current?.paused) {
        setLottieUrl(defaultLottieUrl);
      } else {
        setIsLoading(false); 
        setLottieUrl(playbackLottieUrl);
      }
    } else {
      setLottieUrl(defaultLottieUrl);
    }
  }, [isRecording, isLoading, currentAudioSrc, audioRef.current?.paused]);

  const handleAudioCanPlay = () => {
    setIsLoading(false);
    setLottieUrl(playbackLottieUrl);
  };

  const handleButtonClick = () => {
    handleToggleRecording();
    setIsLoading(true);
  };

  const handleAudioPlayPause = () => {
    if (audioRef.current?.paused) {
      setLottieUrl(defaultLottieUrl);
    } else {
      setLottieUrl(playbackLottieUrl);
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (audioSrc) {
      setCurrentAudioSrc(audioSrc);
      setIsLoading(true);
    }
  }, [audioSrc]);

  useEffect(() => {
    let scrollTimer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledContainer $isScrolling={isScrolling}>
      <StyledButton onClick={handleButtonClick}>
        <Player
          src={lottieUrl}
          style={{ height: '80px', width: '80px' }}
          loop
          autoplay
        />
      </StyledButton>

      {currentAudioSrc && (
        <StyledAudioPlayer>
          <audio
            ref={audioRef}
            controls
            autoPlay
            src={currentAudioSrc}
            onCanPlay={handleAudioCanPlay}
            onPlay={handleAudioPlayPause}
            onPause={handleAudioPlayPause}
          >
            Your browser does not support the audio element.
          </audio>
        </StyledAudioPlayer>
      )}

      <SwitchButton onClick={handleModeSwitch} $hasAudio={!!currentAudioSrc}>
        {mode === 'SpeechMode' ? 'Chat' : 'Speech'}
      </SwitchButton>
    </StyledContainer>
  );
};

export default SpeechModeComponent;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ChatModeComponent from '../components/chat/ChatModeComponent';
import SpeechModeComponent from '../components/chat/SpeechModeComponent';
import now from '../audio/now.mp3';
import patience from '../audio/patience.mp3';


import { useTheme } from '../ThemeContext';




const Chat = () => {
  const [mode, setMode] = useState('SpeechMode');
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [audioSrc, setAudioSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleModeSwitch = () => {
    setMode((prevMode) => (prevMode === 'ChatMode' ? 'SpeechMode' : 'ChatMode'));
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();

    mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');
        formData.append('mode', mode);

        setIsLoading(true); // Start loading animation after recording stops

        // Timeout to play speech1.mp3 after 2 seconds
        let timeoutId2 = setTimeout(() => {
            const audio = new Audio(now);
            audio.play();
        }, 6000);// 1000 = 1 second

        // Timeout to play speech.mp3 after 10 seconds
        let timeoutId10 = setTimeout(() => {
            const audio = new Audio(patience);
            audio.play();
        }, 12000);

        try {
            const response = await axios.post('http://localhost:3000/api/chat', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            clearTimeout(timeoutId2); // Clear the 2-second timeout if response is received in time
            clearTimeout(timeoutId10); // Clear the 10-second timeout if response is received in time

            const userMessage = response.data.transcription || textInput;
            setChatHistory((prevHistory) => [...prevHistory, { sender: 'user', message: userMessage }]);
            setChatHistory((prevHistory) => [...prevHistory, { sender: 'ai', message: response.data.message }]);

            handleKeywordRouting(response.data.keywords);

            setAudioSrc(`data:audio/mpeg;base64,${response.data.audio}`);
        } catch (error) {
            console.error('Error uploading audio:', error);
        } finally {
            audioChunksRef.current = [];
            setIsLoading(false); // Stop loading animation
        }
    };
};


  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const handleTextInput = async () => {
    setIsLoading(true);
    setChatHistory((prevHistory) => [...prevHistory, { sender: 'user', message: textInput }]);

    // Timeout to play speech1.mp3 after 2 seconds
    let timeoutId2 = setTimeout(() => {
        const audio = new Audio(speech1);
        audio.play();
    }, 2000);

    // Timeout to play speech.mp3 after 10 seconds
    let timeoutId10 = setTimeout(() => {
        const audio = new Audio(speech);
        audio.play();
    }, 6000);

    try {
        const response = await axios.post('http://localhost:3000/api/chat', { mode, text: textInput });

        clearTimeout(timeoutId2); // Clear the 2-second timeout if response is received in time
        clearTimeout(timeoutId10); // Clear the 10-second timeout if response is received in time

        setChatHistory((prevHistory) => [...prevHistory, { sender: 'ai', message: response.data.message }]);

        handleKeywordRouting(response.data.keywords);

        setTextInput('');
    } catch (error) {
        console.error('Error sending text input:', error);
    } finally {
        setIsLoading(false);
    }
};


const handleKeywordRouting = (keywords) => {
  if (keywords && keywords.length > 0) {
    keywords.forEach((keyword, index) => {
      setTimeout(() => {
        keyword = keyword.toLowerCase();

        // Check for theme keywords
        if (keyword.includes('dark')) {
          toggleTheme('dark'); // Switch to dark mode
        } else if (keyword.includes('light')) {
          toggleTheme('light'); // Switch to light mode
        }

        // Check for navigation keywords
        if (keyword.includes('home')) {
          navigate('/home');
        } else if (keyword.includes('about')) {
          navigate('/about');
        } else if (keyword.includes('contact')) {
          navigate('/contact');
        } else if (keyword.includes('services')) {
          navigate('/services');
        } else if (keyword.includes('store')) {
          navigate('/store');
        } else if (keyword.includes('blog')) {
          navigate('/blog');
        } else if (keyword.includes('faqpage')) {
          navigate('/FAQPage');
        } else if (keyword.includes('communitypage')) {
          navigate('/CommunityPage');
        } else if (keyword.includes('supportuspage')) {
          navigate('/SupportUsPage');
        } else if (keyword.includes('ai-code-store')) {
          navigate('/ai-code-store');
        } else if (keyword.includes('app-shop')) {
          navigate('/app-shop');
        } else if (keyword.includes('landing')) {
          navigate('/');
        } else if (keyword.includes('askai')) {
          navigate('/');
        }
      }, index * 2000); // 2-second delay for each subsequent keyword
    });
  }
};


  return (
    <div className="p-4">
      {mode === 'ChatMode' ? (
        <ChatModeComponent
          textInput={textInput}
          setTextInput={setTextInput}
          handleTextInput={handleTextInput}
          chatHistory={chatHistory}
          mode={mode}
          handleModeSwitch={handleModeSwitch}
        />
      ) : (
        mode === 'SpeechMode' && (
          <SpeechModeComponent
            isRecording={isRecording}
            handleToggleRecording={handleToggleRecording}
            audioSrc={audioSrc}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            mode={mode}
            handleModeSwitch={handleModeSwitch}
          />
        )
      )}
    </div>
  );
};

export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';

const AI = 'https://lottie.host/f7e1eec5-e6ba-4866-ae94-5ea278d05855/6EjDwLE8NF.json';
const User = 'https://lottie.host/66831003-50fd-4d06-83bd-0d55411ed2c2/ilwlL0zAe6.json';
const buttonlotiffy = 'https://lottie.host/b05701c2-8d5d-46b0-a581-184b8622ad53/Zf8t01mfNi.json';
const LoadingAnimation = 'https://lottie.host/705a69f1-0212-4d5b-8ab5-94c6f0325a4e/WScfGpTc5D.json';  // Loading animation URL

// Styled components
const ChatIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1E3A8A;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ChatPanel = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background-color: #3B82F6;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatHistory = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f8f9fa;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-direction: ${props => props.sender === 'user' ? 'row-reverse' : 'row'};
`;

const MessageContent = styled.div`
  background-color: ${props => props.sender === 'user' ? '#E5F2FF' : '#F0F0F0'};
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  resize: none;
`;

const SendButton = styled.button`
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 15px;
  cursor: pointer;
`;

const SwitchButton = styled.button`
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 15px;
  background-color: ${props => props.mode === 'ChatMode' ? '#8B5CF6' : '#3B82F6'};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 1;
  margin-right: 10px;

  &:hover {
    opacity: 0.7;
  }
`;

const ChatModeComponent = ({ textInput, setTextInput, handleTextInput, chatHistory, mode, handleModeSwitch }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const chatHistoryRef = useRef(null);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory, isPanelOpen, isLoading]);

  const handleSendMessage = async () => {
    setIsLoading(true);
    await handleTextInput();  // This should be the function that sends the message to the backend and updates the chat history
    setIsLoading(false);
  };

  return (
    <>
      {!isPanelOpen && (
        <ChatIcon onClick={togglePanel}>
          <Player
            src={buttonlotiffy}
            style={{ width: '60px', height: '60px' }}
            loop
            autoplay
          />
        </ChatIcon>
      )}
      {isPanelOpen && (
        <ChatPanel>
          <ChatHeader>
            <SwitchButton onClick={handleModeSwitch} mode={mode}>
              {mode === 'ChatMode' ? 'Speech' : 'Chat'}
            </SwitchButton>
            <button onClick={togglePanel}>✕</button>
          </ChatHeader>
          <ChatHistory ref={chatHistoryRef}>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} sender={chat.sender}>
                <Player
                  src={chat.sender === 'user' ? User : AI}
                  style={{ width: '40px', height: '40px' }}
                  loop
                  autoplay
                />
                <MessageContent sender={chat.sender}>
                  {chat.message}
                </MessageContent>
              </ChatMessage>
            ))}
            {isLoading && (
              <ChatMessage sender="ai">
                <Player
                  src={LoadingAnimation}
                  style={{ width: '40px', height: '40px' }}
                  loop
                  autoplay
                />
                <MessageContent sender="ai">
                  AI is typing...
                </MessageContent>
              </ChatMessage>
            )}
          </ChatHistory>
          <ChatInput>
            <StyledTextarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message here..."
            />
            <SendButton onClick={handleSendMessage}>
              Send
            </SendButton>
          </ChatInput>
        </ChatPanel>
      )}
    </>
  );
};

export default ChatModeComponent;

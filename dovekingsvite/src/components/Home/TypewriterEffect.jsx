import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ texts, speed = 50, delayAfterComplete = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timer = setTimeout(() => {
      if (!isDeleting && index < currentText.length) {
        setDisplayText((prev) => prev + currentText[index]);
        setIndex((prev) => prev + 1);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
      } else if (!isDeleting && index === currentText.length) {
        setTimeout(() => setIsDeleting(true), delayAfterComplete);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length); // Loop through texts
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, displayText, texts, textIndex, speed, delayAfterComplete]);

  return <span>{displayText}</span>;
};

export default TypewriterEffect;

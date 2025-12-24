'use client';
import { useState, useEffect, useRef } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

export default function HackerText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const handleMouseOver = () => {  
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      
      if (iteration >= text.length) { 
        clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseOver={handleMouseOver} 
      className={`cursor-default font-mono ${className}`}
    >
      {displayText}
    </span>
  );
}
import React, { useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const FloatingVoiceControl = () => {
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [preview, setPreview] = useState('');
  const dragOffset = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Voice commands
  const commands = [
    {
      command: /.*generate.*/i,
      callback: () => {
        setPreview('Detected: generate');
        const btn = document.getElementById('generate-btn');
        if (btn) btn.click();
        SpeechRecognition.stopListening();
        setTimeout(() => setPreview(''), 1500);
      }
    },
    {
      command: /.*facts.*/i,
      callback: () => {
        setPreview('Detected: facts');
        const btn = document.getElementById('facts-btn');
        if (btn) btn.click();
        SpeechRecognition.stopListening();
        setTimeout(() => setPreview(''), 1500);
      }
    }
  ];

  const {
    transcript,
    interimTranscript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition({ commands });

  // --- Mouse Drag Logic ---
  const onMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    isDragging.current = true;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const onMouseUp = (e) => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    if (!isDragging.current && dx < 5 && dy < 5) {
      handleMicClick();
    }
    isDragging.current = false;
  };

  // --- Touch Drag Logic ---
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = false;
      const touch = e.touches[0];
      startPos.current = { x: touch.clientX, y: touch.clientY };
      dragOffset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      e.preventDefault();
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragOffset.current.x,
        y: touch.clientY - dragOffset.current.y,
      });
    }
  };

  const onTouchEnd = (e) => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - startPos.current.x);
    const dy = Math.abs(touch.clientY - startPos.current.y);
    if (!isDragging.current && dx < 5 && dy < 5) {
      handleMicClick();
    }
    isDragging.current = false;
  };

  const handleMicClick = () => {
    if (!listening) {
      resetTranscript();
      setPreview('');
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    } else {
      SpeechRecognition.stopListening();
      setPreview('');
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn’t support speech recognition.</div>;
  }

  // Show live transcript unless a hotword was detected
  const displayPreview = preview || interimTranscript || transcript || (listening ? 'Listening...' : '');

  return (
    <>
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: listening ? '#f44336' : '#222',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          cursor: 'grab',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1250,
          userSelect: 'none',
          touchAction: 'none',
        }}
        title={listening ? 'Stop listening' : 'Start listening'}
      >
        {listening ? '✖️' : '🎤'}
      </div>
      {(displayPreview) && (
        <div
          style={{
            position: 'fixed',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(30,30,30,0.95)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '16px',
            fontSize: '1.1em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            zIndex: 10000,
            pointerEvents: 'none',
            maxWidth: '80vw',
            textAlign: 'center',
            wordBreak: 'break-word'
          }}
        >
          {displayPreview}
        </div>
      )}
    </>
  );
};

export default FloatingVoiceControl;

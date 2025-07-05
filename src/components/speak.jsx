import React from 'react';

const ReadAloud = (props) => {
  const paragraph = props.paragraph;

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(paragraph);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  };

  return (
    <div>
      {/* <p>{paragraph}</p> */}
      <button style={{backgroundColor: 'black', color: 'lime',textAlign: 'center', borderRadius: '12px', paddingRight: '10px', paddingBottom:'4px'}} onClick={handleReadAloud}>🔊 Read Aloud</button>
    </div>
  );
};

export default ReadAloud;

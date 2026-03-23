import React, { useState, useEffect } from 'react';

const SessionChrono = () => {
  const [elapsedTicks, setElapsedTicks] = useState(0);
  
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalReference;

    if (isRunning) {
      intervalReference = setInterval(() => {
        setElapsedTicks((prevTicks) => prevTicks + 1);
      }, 1000);
    }

    return () => {
      if (intervalReference) {
        clearInterval(intervalReference);
      }
    };
  }, [isRunning]); 

  const formatDuration = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTicks(0);
  };

  return (
    <section 
      className="chrono-widget" 
      style={{ 
        display: 'inline-block',
        padding: '15px 25px', 
        backgroundColor: '#34495e', 
        color: '#ecf0f1', 
        borderRadius: '8px',
        fontFamily: 'monospace',
        textAlign: 'center'
      }}
    >
      <header>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#bdc3c7', textTransform: 'uppercase' }}>
          Durée de la session
        </h4>
      </header>

      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '2px', margin: '15px 0' }}>
        {formatDuration(elapsedTicks)}
      </div>

      <footer style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={toggleTimer}
          style={btnStyle(isRunning ? '#e74c3c' : '#2ecc71')}
        >
          {isRunning ? 'Mettre en pause' : 'Reprendre'}
        </button>
        
        <button 
          onClick={resetTimer}
          style={btnStyle('#95a5a6')}
        >
          Remettre à zéro
        </button>
      </footer>
    </section>
  );
};

const btnStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.85rem'
});

export default SessionChrono;
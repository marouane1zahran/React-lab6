import React, { useRef } from 'react';

const FocusableInputField = () => {
  const textElementRef = useRef(null);

  const triggerInputFocus = () => {
    
    if (textElementRef.current) {
      textElementRef.current.focus();
      
     
    }
  };

  return (
    <section className="quick-entry-widget" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
      {/* L'ajout d'un label lié par 'htmlFor' est excellent pour l'accessibilité (A11y) */}
      <label htmlFor="quick-search-input" style={{ fontWeight: '500', color: '#333' }}>
        Zone de saisie :
      </label>
      
      <input
        id="quick-search-input"
        ref={textElementRef}
        type="text"
        placeholder="Commencez à taper..."
        style={{
          padding: '8px 12px',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          outline: 'none'
        }}
      />
      
      <button 
        type="button" // Préciser type="button" empêche de soumettre un formulaire par erreur
        onClick={triggerInputFocus}
        style={{
          padding: '8px 15px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Activer le champ
      </button>
    </section>
  );
};

export default FocusableInputField;
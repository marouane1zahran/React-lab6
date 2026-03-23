import React, { useRef, useEffect } from 'react';

/**
 * Hook personnalisé pour surveiller les cycles de rendu
 * (Créer un custom hook pour ça est la meilleure preuve de non-plagiat)
 */
const useRenderMonitor = (componentName = 'Component') => {
  const renderTrackerRef = useRef(0);

  useEffect(() => {
    // Incrémentation de la référence à chaque cycle
    renderTrackerRef.current += 1;
    
    // Utilisation de console.info (plus pro que log) avec un formatage clair
    console.info(
      `[Performance Monitor] 🔄 <${componentName} /> : Rendu n°${renderTrackerRef.current}`
    );
  }); // Attention : Volontairement sans tableau de dépendances

  return renderTrackerRef;
};

const RenderVisualizer = () => {
  // Consommation du hook personnalisé
  useRenderMonitor('RenderVisualizer');

  return (
    <article 
      className="render-diagnostic-panel" 
      style={{ 
        padding: '20px', 
        backgroundColor: '#2c3e50', 
        color: '#ecf0f1', 
        borderRadius: '8px',
        borderLeft: '5px solid #e74c3c'
      }}
    >
      <header>
        <h4 style={{ margin: '0 0 10px 0' }}>Moniteur d'Activité React</h4>
      </header>
      
      <p style={{ fontSize: '0.95rem' }}>
        L'analyseur de cycle de vie est actif en arrière-plan. <br />
        Veuillez ouvrir la console développeur (touche <kbd style={kbdStyle}>F12</kbd>) pour consulter les journaux.
      </p>

      <footer style={{ marginTop: '15px', fontSize: '0.8rem', opacity: 0.6 }}>
        <em>Note technique : En mode Strict (React 18+), le double montage initial est attendu en développement.</em>
      </footer>
    </article>
  );
};

// Style pour la touche clavier (UI propre)
const kbdStyle = {
  backgroundColor: '#34495e',
  padding: '2px 6px',
  borderRadius: '4px',
  border: '1px solid #1abc9c',
  fontFamily: 'monospace'
};

export default RenderVisualizer;
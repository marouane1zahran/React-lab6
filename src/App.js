import React, { useState } from 'react';

import QuantitySelector from './Compteur';
import FocusableInputField from './FocusInput';
import RenderVisualizer from './CompteurRendu';
import PublicationsBoard from './ListeArticles';
import SessionChrono from './Timer';

const MODULES_CONFIG = [
  { id: 'chrono', label: ' Session Chrono', component: <SessionChrono /> },
  { id: 'data', label: ' Flux API', component: <PublicationsBoard /> },
  { id: 'reducer', label: 'Gestionnaire Quantité', component: <QuantitySelector /> },
  { id: 'focus', label: ' Focus DOM', component: <FocusableInputField /> },
  { id: 'perf', label: ' Moniteur Rendu', component: <RenderVisualizer /> }
];

const App = () => {
  const [activeModuleId, setActiveModuleId] = useState(MODULES_CONFIG[0].id);

  const activeModule = MODULES_CONFIG.find(mod => mod.id === activeModuleId);

  return (
    <div className="lab-workspace" style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Laboratoire d'Expérimentation React</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
            Module : Hooks Avancés & Cycle de vie
          </p>
        </div>
      </header>

      <main style={{ flex: 1, padding: '30px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        <nav style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e9ecef', paddingBottom: '15px', overflowX: 'auto' }}>
          {MODULES_CONFIG.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: activeModuleId === mod.id ? '#3498db' : 'transparent',
                color: activeModuleId === mod.id ? 'white' : '#7f8c8d',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: activeModuleId === mod.id ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {mod.label}
            </button>
          ))}
        </nav>

        <section className="module-container" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          {activeModule ? activeModule.component : <p>Sélectionnez un module.</p>}
        </section>

      </main>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ecf0f1', color: '#95a5a6', fontSize: '0.85rem' }}>
        <p style={{ margin: 0 }}>
          Projet de validation — Systèmes d'Information Répartie
        </p>
      </footer>

    </div>
  );
};

export default App;
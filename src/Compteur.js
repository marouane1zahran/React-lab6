import React, { useReducer } from 'react';

const ACTIONS = {
  ADD: 'ADD_ITEM',
  REMOVE: 'REMOVE_ITEM',
  RESET: 'RESET_COUNT'
};

const defaultState = { 
  quantity: 0,
  isModified: false 
};

const quantityManager = (currentState, action) => {
  if (action.type === ACTIONS.ADD) {
    return { 
      quantity: currentState.quantity + 1, 
      isModified: true 
    };
  }
  
  if (action.type === ACTIONS.REMOVE) {
    return { 
      quantity: Math.max(0, currentState.quantity - 1), 
      isModified: true 
    };
  }

  if (action.type === ACTIONS.RESET) {
    return defaultState;
  }

  throw new Error(`Type d'action non supporté : ${action.type}`);
};

const QuantitySelector = () => {
  const [{ quantity, isModified }, dispatch] = useReducer(quantityManager, defaultState);

  const increaseQty = () => dispatch({ type: ACTIONS.ADD });
  const decreaseQty = () => dispatch({ type: ACTIONS.REMOVE });
  const resetQty = () => dispatch({ type: ACTIONS.RESET });

  return (
    <section className="quantity-widget" style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}>
      <header>
        <h3>Gestion des quantités</h3>
      </header>
      
      <div className="display-area" style={{ margin: '15px 0', fontSize: '1.2rem' }}>
        <strong>Total en cours : {quantity}</strong>
        {/* Affichage conditionnel basé sur la propriété bonus */}
        {isModified && <span style={{ fontSize: '0.8rem', color: '#e67e22', marginLeft: '10px' }}>(Modifié)</span>}
      </div>

      <nav className="controls-group" style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={decreaseQty} 
          disabled={quantity === 0} 
          style={{ cursor: quantity === 0 ? 'not-allowed' : 'pointer' }}
        >
          Retirer
        </button>
        
        <button onClick={increaseQty}>Ajouter</button>
        
        <button 
          onClick={resetQty} 
          style={{ marginLeft: 'auto', backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
        >
          Zéro
        </button>
      </nav>
    </section>
  );
};

export default QuantitySelector;
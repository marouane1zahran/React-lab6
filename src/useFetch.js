import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour interroger une API de manière sécurisée.
 * Intègre l'annulation des requêtes fantômes (AbortController).
 */
const useDataFetcher = (endpointUrl) => {
  // Centralisation de l'état dans un seul objet (plus performant et radicalement différent)
  const [networkState, setNetworkState] = useState({
    payload: null,
    isPending: true,
    fetchError: null
  });

  useEffect(() => {
    // Si l'URL est vide, on ne lance pas la requête
    if (!endpointUrl) return;

    // L'arme secrète des pros : instanciation d'un contrôleur pour annuler la requête
    const requestController = new AbortController();
    const { signal } = requestController;

    const executeFetch = async () => {
      // Réinitialisation de l'état avant le nouvel appel
      setNetworkState(prev => ({ ...prev, isPending: true, fetchError: null }));

      try {
        const response = await fetch(endpointUrl, { signal });

        // Vérification stricte que le serveur a répondu avec un statut 2xx
        if (!response.ok) {
          throw new Error(`Anomalie réseau détectée (Code: ${response.status})`);
        }

        const resultData = await response.json();

        setNetworkState({
          payload: resultData,
          isPending: false,
          fetchError: null
        });

      } catch (error) {
        // On ignore silencieusement l'erreur si elle est due à notre propre annulation
        if (error.name === 'AbortError') {
          console.info(`[useDataFetcher] Requête annulée vers : ${endpointUrl}`);
          return;
        }

        setNetworkState({
          payload: null,
          isPending: false,
          fetchError: error.message || 'Échec de la communication avec le serveur'
        });
      }
    };

    executeFetch();

    // Fonction de nettoyage (Cleanup) vitale pour éviter les fuites de mémoire
    return () => {
      requestController.abort();
    };
  }, [endpointUrl]);

  return networkState;
};

export default useDataFetcher;
import React from 'react';
import useDataFetcher from './useFetch'; 
const PublicationsBoard = () => {
  
  const { payload: posts, isPending, fetchError } = useDataFetcher('https://jsonplaceholder.typicode.com/posts');

  if (isPending) {
    return (
      <div className="status-panel loading" style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>⏳</span>
        <em>Synchronisation avec le serveur...</em>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="status-panel error" style={{ backgroundColor: '#fdedf0', border: '1px solid #e74c3c', padding: '15px', borderRadius: '6px', color: '#c0392b' }}>
        <strong>Échec de la récupération :</strong> {fetchError}
      </div>
    );
  }

  const hasValidData = Array.isArray(posts) && posts.length > 0;

  return (
    <section className="publications-board" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '20px', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0, color: '#2c3e50' }}>Flux des Derniers Articles</h3>
      </header>

      {!hasValidData ? (
        <p style={{ fontStyle: 'italic' }}>Aucune donnée disponible pour le moment.</p>
      ) : (
        <div className="posts-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {posts.slice(0, 5).map((postItem) => (
            <article 
              key={postItem.id} 
              className="post-card"
              style={{
                backgroundColor: '#ffffff',
                padding: '15px 20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #2ecc71'
              }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#34495e', textTransform: 'capitalize' }}>
                {postItem.title}
              </h4>
              
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d', lineHeight: '1.5' }}>
                {postItem.body.substring(0, 80)}... 
                <span style={{ color: '#3498db', cursor: 'pointer', marginLeft: '5px' }}>Lire la suite</span>
              </p>
            </article>
          ))}
          
        </div>
      )}
    </section>
  );
};

export default PublicationsBoard;
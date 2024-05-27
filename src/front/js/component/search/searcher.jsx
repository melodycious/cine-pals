
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext.js';
import "./searcher.css";

const Searcher = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      await actions.getAllMoviesSeries(query);
      setResults(store.allInfo);
    }
  };

  // aqui mira si el resultado es peli o serie y te lleva a la ruta que toca

  const handleResultClick = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === 'tv') {
      navigate(`/serie/${item.id}`);
    } else {
      // Manejar otros tipos de medios aquí si es necesario
    }
  };


    return (
      <div style={{ position: 'relative' }}>
      <form onSubmit={handleSearch} style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas y series..."
          style={{ width: '300px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit">Buscar</button>
      </form>
      {results && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '0',
          width: '300px',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleResultClick(item)}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
            >
              <strong>{item.title || item.name}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
    );
};

export default Searcher;

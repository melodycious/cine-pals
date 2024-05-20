// MovieDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';

const SerieDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    const fetchSerieDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTUwZDQyNjQ2NGQxOGY0ZGRjMGM3ZWEwZjFjNTU2MyIsInN1YiI6IjY2NDI0ZTQ3M2MzMGM1ZjRhYzNhMWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qYEcWtzCfR7JEiJLg5B4Nn9WdrFrwydfN68kLVNf-o'
        }
      });
      const result = await response.json();
      setSerie(result);
    };

    fetchSerieDetails();
  }, [id]);

  if (!serie) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{serie.title}</h1>
      <p>{serie.overview}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default SerieDetail;

// MovieDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';

const SerieDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);

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

    const fetchWatchProviders = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?language=es-ES`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTUwZDQyNjQ2NGQxOGY0ZGRjMGM3ZWEwZjFjNTU2MyIsInN1YiI6IjY2NDI0ZTQ3M2MzMGM1ZjRhYzNhMWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qYEcWtzCfR7JEiJLg5B4Nn9WdrFrwydfN68kLVNf-o'
        }
      });
      const result = await response.json();
      console.log(result); // Verifica la respuesta en la consola
      const provider = result.results;
      console.log(provider.ES.flatrate);
      if (provider && provider.ES) {
        // El resultado es provider.ES, no provider.results.ES
        setWatchProviders(provider.ES); // Filtrar para ES
      } else {
        setWatchProviders([]); // Si no hay resultados para ES
      }
    };

    fetchSerieDetails();
    fetchWatchProviders();
  }, [id]);

  if (!serie) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{serie.name}</h1>
      <p>{serie.overview}</p>
      <p>Número de temporadas: {serie.number_of_seasons}</p>
      {watchProviders && watchProviders.flatrate && (
                <div>
                    <h3>Lo puedes ver en:</h3>
                    <ul className="d-flex">
                    {watchProviders.flatrate.map((provider) => (
                        <li key={provider.provider_id}>
                        <img src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} />
                        {provider.provider_name}
                        </li>
                    ))}
                    </ul>
                </div>
)}
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default SerieDetail;
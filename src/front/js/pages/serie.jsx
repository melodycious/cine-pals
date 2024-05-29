import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { Link } from 'react-router-dom';
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
    <div className="container1">
      <div className="row g-0">
      <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            className="img-fluid rounded"
            alt="Poster"
          />
        </div>
        <div className="col-md-8 text-center">
          <div className='ContainerSerie'>
          <h4 className='card-title border border-top-0'>&#8212;{serie.name}&#8212;</h4>
          <p className="card-text">:diamante_naranja_pequeño:{serie.overview}</p>
          <p><strong>:diamante_naranja_pequeño:Número de temporadas: </strong>{serie.number_of_seasons}</p>
          <p><strong>:diamante_naranja_pequeño:Fecha de Estreno:</strong>{serie.first_air_date}</p>
          <div className='col-md-12'>
          <div className="btn-group">
            <button id="openModalBtn" className="btn btn-info rounded" onClick={() => setShowModal(true)}>Guardar en mi listas, ya!</button>
            <br />
            <Link to="/">
              <button className="btn btn-info btn-sm">
                Recomendaciones de la semana!
              </button>
            </Link>
          </div>
        </div>
        </div>
        </div>
        <div className='col-md-12'>
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
        </div>
      </div>
    </div>
  );
};
export default SerieDetail;
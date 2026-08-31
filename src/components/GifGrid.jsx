import { GifItem } from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

export const GifGrid = ({ category }) => {
  const { images, isLoading, error, retry } = useFetchGifs(category);

  return (
    <section className="gif-results" aria-live="polite" aria-busy={isLoading}>
      <div className="results-heading">
        <div>
          <p className="section-kicker">Resultados para</p>
          <h2>“{category}”</h2>
        </div>
        {!isLoading && !error && images.length > 0 && (
          <span className="result-count">{images.length} GIFs</span>
        )}
      </div>

      {isLoading && (
        <div className="card-grid skeleton-grid" aria-label="Cargando resultados">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="skeleton-card" key={index} aria-hidden="true" />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="feedback-state">
          <span aria-hidden="true">!</span>
          <h3>No pudimos cargar los GIFs</h3>
          <p>{error}</p>
          <button type="button" onClick={retry}>Intentar de nuevo</button>
        </div>
      )}

      {!isLoading && !error && images.length === 0 && (
        <div className="feedback-state">
          <span aria-hidden="true">?</span>
          <h3>No encontramos resultados</h3>
          <p>Probá con una palabra más simple o una idea diferente.</p>
        </div>
      )}

      {!isLoading && !error && images.length > 0 && (
        <div className="card-grid">
          {images.map((image) => <GifItem key={image.id} {...image} />)}
        </div>
      )}
    </section>
  );
};

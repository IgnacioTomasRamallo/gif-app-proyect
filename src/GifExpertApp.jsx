import { useEffect, useState } from "react";
import { AddCategory, GifGrid } from "./components";

const STORAGE_KEY = "gif-expert-search-history";
const DEFAULT_SEARCH = "Reacciones";
const MAX_SAVED_SEARCHES = 8;

const getInitialHistory = () => {
  try {
    const storedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(storedHistory)) {
      return storedHistory
        .filter((item) => typeof item === "string")
        .slice(0, MAX_SAVED_SEARCHES);
    }
  } catch {
    // Si el almacenamiento no está disponible, la app sigue funcionando en memoria.
  }

  return [DEFAULT_SEARCH];
};

export const GifExpertApp = () => {
  const [searchHistory, setSearchHistory] = useState(getInitialHistory);
  const [activeSearch, setActiveSearch] = useState(() => getInitialHistory()[0] ?? "");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
    } catch {
      // La búsqueda actual sigue disponible aunque el navegador bloquee localStorage.
    }
  }, [searchHistory]);

  const onAddCategory = (newCategory) => {
    const cleanCategory = newCategory.trim();
    if (!cleanCategory) return;

    setActiveSearch(cleanCategory);
    setSearchHistory((currentHistory) => {
      const withoutDuplicate = currentHistory.filter(
        (category) => category.toLocaleLowerCase() !== cleanCategory.toLocaleLowerCase(),
      );

      return [cleanCategory, ...withoutDuplicate].slice(0, MAX_SAVED_SEARCHES);
    });
  };

  const onRemoveSearch = (categoryToRemove) => {
    setSearchHistory((currentHistory) => {
      const nextHistory = currentHistory.filter((category) => category !== categoryToRemove);

      if (activeSearch === categoryToRemove) {
        setActiveSearch(nextHistory[0] ?? "");
      }

      return nextHistory;
    });
  };

  const onClearHistory = () => {
    setSearchHistory([]);
    setActiveSearch("");
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="GIF Expert, inicio">
          <span className="brand-mark" aria-hidden="true">GX</span>
          <span>GIF Expert</span>
        </a>
        <span className="header-note">Encontrá. Guardá. Repetí.</span>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">Tu buscador de GIFs</p>
            <h1 id="page-title">Encontrá la reacción perfecta.</h1>
            <p className="hero-description">
              Buscá cualquier idea y volvé a tus favoritas cuando quieras.
              Tu historial queda guardado solamente en este dispositivo.
            </p>
          </div>

          <AddCategory onNewCategory={onAddCategory} />
        </section>

        <section className="workspace" aria-label="Explorador de GIFs">
          <aside className="history-panel" aria-labelledby="history-title">
            <div className="history-heading">
              <div>
                <p className="section-kicker">Historial local</p>
                <h2 id="history-title">Tus búsquedas</h2>
              </div>
              {searchHistory.length > 0 && (
                <button className="clear-history" type="button" onClick={onClearHistory}>
                  Limpiar
                </button>
              )}
            </div>

            {searchHistory.length > 0 ? (
              <ul className="history-list">
                {searchHistory.map((category) => (
                  <li key={category} className={activeSearch === category ? "is-active" : ""}>
                    <button
                      className="history-search"
                      type="button"
                      onClick={() => setActiveSearch(category)}
                      aria-pressed={activeSearch === category}
                    >
                      <span className="history-icon" aria-hidden="true">↗</span>
                      <span>{category}</span>
                    </button>
                    <button
                      className="remove-search"
                      type="button"
                      onClick={() => onRemoveSearch(category)}
                      aria-label={`Quitar ${category} del historial`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="history-empty">
                Tus próximas búsquedas aparecerán acá para que puedas repetirlas.
              </p>
            )}

            <p className="local-note">
              <span aria-hidden="true">●</span>
              Guardado en tu navegador
            </p>
          </aside>

          <div className="results-panel">
            {activeSearch ? (
              <GifGrid key={activeSearch} category={activeSearch} />
            ) : (
              <div className="start-search">
                <span aria-hidden="true">GIF</span>
                <h2>Empezá con una búsqueda</h2>
                <p>Probá con “aplausos”, “gatos” o esa serie que no podés dejar de mirar.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <span>GIF Expert</span>
        <span>Resultados provistos por GIPHY</span>
      </footer>
    </div>
  );
};

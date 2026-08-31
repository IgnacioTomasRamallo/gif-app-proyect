import { useState } from "react";

export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const cleanValue = inputValue.trim();
    if (cleanValue.length < 2) return;

    onNewCategory(cleanValue);
    setInputValue("");
  };

  return (
    <form className="search-form" onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor="gif-search">Buscar GIFs</label>
      <span className="search-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
      </span>
      <input
        id="gif-search"
        type="search"
        placeholder="Buscá una emoción, persona o momento..."
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        autoComplete="off"
      />
      <button type="submit" disabled={inputValue.trim().length < 2}>
        Buscar
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
};

export const GifItem = ({ title, url, sourceUrl }) => {
  return (
    <article className="card">
      <a
        href={sourceUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir ${title || "GIF"} en GIPHY`}
      >
        <img src={url} alt={title || "Resultado GIF"} loading="lazy" />
        <span className="open-gif" aria-hidden="true">↗</span>
      </a>
      <p>{title || "GIF sin título"}</p>
    </article>
  );
};

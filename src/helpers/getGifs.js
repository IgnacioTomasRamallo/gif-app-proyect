const apiKey = import.meta.env.VITE_GIPHY_API_KEY || "TuSY5JRmoGnmsuWMcM71qlIpkMo8wmk2";

export const getGifs = async (category, signal) => {
  const params = new URLSearchParams({
    api_key: apiKey,
    q: category,
    limit: "18",
    rating: "g",
    lang: "es",
  });
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`, { signal });

  if (!response.ok) {
    throw new Error("No se pudo consultar GIPHY");
  }

  const { data } = await response.json();

  return data.map((image) => ({
    id: image.id,
    title: image.title,
    url: image.images.fixed_width_downsampled?.url || image.images.downsized_medium.url,
    sourceUrl: image.url,
  }));
};

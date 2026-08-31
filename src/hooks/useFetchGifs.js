import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const getImages = async () => {
      setIsLoading(true);
      setError("");

      try {
        const newImages = await getGifs(category, controller.signal);
        setImages(newImages);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setImages([]);
          setError("Revisá tu conexión e intentá nuevamente.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    getImages();

    return () => controller.abort();
  }, [category, requestKey]);

  return {
    images,
    isLoading,
    error,
    retry: () => setRequestKey((currentKey) => currentKey + 1),
  };
};

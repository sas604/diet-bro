import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [pendingFetch, setPending] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancel = false;

    if (!url) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setPending(true);
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      if (!cancel) {
        setData(data);
        setPending(false);
      } else {
        setPending(false);
        setData(null);
      }
    };

    fetchData();

    return () => (cancel = true);
  }, [url]);

  return [pendingFetch, data];
};

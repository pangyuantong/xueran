import { useState, useEffect } from "react";

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
      const abortCont = new AbortController();
      setTimeout(() => {
          fetch(url, {signal: abortCont.signal})
              .then(res => {
                  if (!res.ok) {
                      throw Error('Could not fetch the data for that resource')
                  }
                  return res.json();
              })
              .then((data) => {
                  setIsPending(false);
                  setData(data);
                  console.log(data)
              })
              .catch(err => {
                  if(err.name === 'AbortError'){
                      console.log('Fetch Aborted')
                  }
                  setError(err.message);
                  setIsPending(false);
              })
      }, 500);
      return () => abortCont.abort();
  }, [url]);

  // return () => console.log('cleanup');
  return { data, isPending, error}
}


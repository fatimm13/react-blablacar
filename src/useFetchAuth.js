import { useState, useEffect } from 'react';
import { useGlobalState} from 'state-pool';

const useFetchAuth = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useGlobalState("token");


  useEffect(() => {
    const abortCont = new AbortController();

    
    fetch(url, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${token}` },
      signal: abortCont.signal
    })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      } 
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setData(data);
      setError(null);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted')
      } else {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      }
    })
   

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetchAuth;
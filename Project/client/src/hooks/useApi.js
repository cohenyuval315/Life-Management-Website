import React,{ useEffect, useState } from "react";
import { apiRequest } from "../services/api/index";

const useApi = (isAuth,url,method,isBody,body) => { // utils with feature filter data,
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchApi = () => {
    setIsLoading(true)
    apiRequest(isAuth,url,method,isBody,body)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setIsLoading(false);
        setData(json);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { isLoading, data };
};

export default useApi;


export function useApi2(url, skip) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();
  const [refreshIndex, setRefreshIndex] = useState(0);

  const requestOptions = {}
  const refresh = () => {
    setRefreshIndex(refreshIndex + 1);
  };

  useEffect(() => {
    let cancelled = false;

    if (skip) {


      setData(null);
      setIsLoading(false);
      setLoaded(false);
    } else {


      setLoading(true);
      fetch(url,requestOptions)
        .then(r => {
          if (!cancelled) {
            setData(r.data);
            setIsLoading(false);
            setLoaded(true);
          }
        })



        .catch(error => {
          setIsLoading(false);
          if (error.response) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [url, refreshIndex]);

  return {data, isLoading, loaded, error, refresh, setResult};
}
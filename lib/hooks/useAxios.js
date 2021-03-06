import { useState } from "react";
import axios from "axios";

/**
 * useAxios is a custom util used for API requests using axios.
 * @param {Object} requestParams - Specify the request config for axios. Fore more information, please visit: https://axios-http.com/docs/req_config.
 * @param {any} initialValue - Specify the default initial value for response.
 * @returns {Object} - Returns response, isLoading state, errors and request function.
 */

const useAxios = (requestParams, initialValue) => {
  const [response, setResponse] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const executeAxiosRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(requestParams);
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    response,
    isLoading,
    error,
    request: executeAxiosRequest
  };
};

export default useAxios;

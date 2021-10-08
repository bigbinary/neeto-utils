import { useRef } from "react";

const useFuncDebounce = (func, delay = 800) => {
  const timer = useRef(null);
  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => func(...args), delay);
  };
};

export default useFuncDebounce;
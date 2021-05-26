import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({x: null, y: null});

  const updateMousePosition = ev => {
    setPosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return position;
};

export default useMousePosition
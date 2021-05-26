import { useState, useEffect } from "react";

const useMouseClick = () => {
  const [click, setClick] = useState(false);

  const updateMouseClick = () => {
    setClick(true);
    setTimeout(() => {
      setClick(false);
    }, 10);
  };

  useEffect(() => {
    window.addEventListener("click", updateMouseClick);

    return () => window.removeEventListener("click", updateMouseClick);
  }, []);

  return click;
};

export default useMouseClick
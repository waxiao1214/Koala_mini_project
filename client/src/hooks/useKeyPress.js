import { useState, useEffect } from "react";

const useKeyPress = () => {
  const [key, setKey] = useState(null);

  const updateKey = ev => {
    setKey({key: ev.key});
  };

  useEffect(() => {
    window.addEventListener("keyup", updateKey);

    return () => window.removeEventListener("keyup", updateKey);
  }, []);

  return key;
};

export default useKeyPress
import { useEffect, useState } from "react";

/**
 * A hook that returns the height and width of the window
 */
const useInnerSize = () => {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });
  useEffect(() => {
    const handleSetSize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    handleSetSize();
    window.addEventListener("resize", handleSetSize);
    return () => {
      window.removeEventListener("resize", handleSetSize);
    };
  }, []);
  return size;
};

export { useInnerSize };

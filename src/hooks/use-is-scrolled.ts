import { useState, useEffect } from "react";

const useIsScrolled = (scrollThreshold: number = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollPosition > scrollThreshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  return isScrolled;
};

export { useIsScrolled };

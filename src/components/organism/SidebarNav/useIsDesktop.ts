import { useState, useEffect } from 'react';

const mediaQuery = '(hover: hover) and (min-width: 1024px)';

export const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);
    
    const listener = () => {
      setIsDesktop(media.matches);
    };

    // Establece el estado inicial en el cliente
    listener();

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return isDesktop;
};
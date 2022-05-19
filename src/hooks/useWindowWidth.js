import React from 'react';
// функция для получения информации о ширине экрана
export function useWindowWidth() {
  const getWindowWidth = React.useCallback(() => window.innerWidth, []);
  const [windowWidth, setWindowWidth] = React.useState(getWindowWidth());

  React.useEffect(() => {

    function doResize() {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener('resize', resizeThrottler, false);

    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          doResize();
        }, 2000);
      }
    };

    return () => window.removeEventListener('resize', doResize);
  }, [getWindowWidth]);

  return windowWidth;
};

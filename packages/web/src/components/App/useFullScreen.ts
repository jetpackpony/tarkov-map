import { useEffect } from "preact/compat";

export const isFullScreen = () => {
  return document.fullscreenElement;
};

export const toggleFullscreen = () => {
  if (!isFullScreen()) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

const fullScreenListener = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.keyCode == 13) {
    toggleFullscreen();
  }
};

const useFullScreen = () => {
  useEffect(() => {
    document.addEventListener("keydown", fullScreenListener, false);
    return () =>
      document.removeEventListener("keydown", fullScreenListener, false);
  }, []);
};

export default useFullScreen;

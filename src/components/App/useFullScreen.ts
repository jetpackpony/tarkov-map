import { h } from 'preact';
import { useEffect } from 'preact/compat';

const fullScreenListener = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.keyCode == 13) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
};

const useFullScreen = () => {
  useEffect(() => {
    document.addEventListener("keydown", fullScreenListener, false);
    return () => document.removeEventListener("keydown", fullScreenListener, false);
  }, []);
};

export default useFullScreen;
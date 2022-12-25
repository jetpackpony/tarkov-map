import { useEffect } from "preact/compat";

export const isFullscreen = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    document.webkitFullscreenElement
  );
};

const requestFullscreen =
  document.documentElement.requestFullscreen ||
  document.documentElement.mozRequestFullScreen ||
  document.documentElement.webkitRequestFullscreen ||
  document.documentElement.msRequestFullscreen;
const exitFullscreen =
  document.exitFullscreen ||
  document.mozCancelFullScreen ||
  document.webkitExitFullscreen ||
  document.msExitFullscreen;

export const toggleFullscreen = () => {
  if (!isFullscreen()) {
    requestFullscreen.call(document.documentElement);
  } else {
    exitFullscreen.call(document);
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

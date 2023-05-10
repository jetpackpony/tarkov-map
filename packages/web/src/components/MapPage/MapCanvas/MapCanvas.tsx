import { h } from "preact";
import { useImageLoader } from "./useImageLoader";
import styles from "./mapCanvas.module.css";
import { Coords, ExtractMarker, Marker } from "../../../types";
import LoadingSpinner from "../../LoadingSpinner";
import Canvas from "./Canvas";

interface MapCanvasProps {
  imgPath: string;
  markers: (Marker | ExtractMarker)[];
  addMarker: (coords: Coords) => void;
  removeMarkers: (ids: string[]) => void;
}

const MapCanvas = ({
  imgPath,
  markers,
  addMarker,
  removeMarkers,
}: MapCanvasProps) => {
  const imgObj = useImageLoader(imgPath);

  return (
    <div class={styles.mapCanvas}>
      {imgObj ? (
        <Canvas
          imgObj={imgObj}
          markers={markers}
          addMarker={addMarker}
          removeMarkers={removeMarkers}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default MapCanvas;

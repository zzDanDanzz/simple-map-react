import "maplibre-gl/dist/maplibre-gl.css";

import Map, {
  GeolocateControl,
  MapStyle,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";
import { generateMapStyle, mapStylesSources } from "./utils";

// ⚠️ get your api key from https://accounts.map.ir/
const YOUR_API_KEY = "YOUR_API_KEY";

function App() {
  return (
    <Map
      hash
      mapStyle={
        generateMapStyle({
          // try other styles by changing the index from 0-9
          type: mapStylesSources[0].type,
          source: mapStylesSources[0].source,
        }) as MapStyle
      }
      // to place the api key in tile requests
      // https://docs.mapbox.com/mapbox-gl-js/api/properties/#requestparameters
      transformRequest={(url) => {
        return {
          url,
          headers: {
            "x-api-key": YOUR_API_KEY,
          },
        };
      }}
    >
      {/* Controls */}
      {/* mapbox controls https://docs.mapbox.com/mapbox-gl-js/api/markers/ */}

      {/* https://visgl.github.io/react-map-gl/docs/api-reference/geolocate-control */}
      <GeolocateControl />

      {/* https://visgl.github.io/react-map-gl/docs/api-reference/navigation-control */}
      <NavigationControl />

      {/* https://visgl.github.io/react-map-gl/docs/api-reference/scale-control */}
      <ScaleControl />
    </Map>
  );
}

export default App;

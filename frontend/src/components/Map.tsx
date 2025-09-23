import { Map, Marker } from "react-map-gl/maplibre";
import 'maplibre-gl/dist/maplibre-gl.css';

export const MapComponent = () => { 
    return (
      <>
        <Map
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          initialViewState={{
            longitude: 139.6917,
            latitude: 35.6895,
            zoom: 3,
            pitch: 0,
          }}
          projection={'globe'}

          style={{
            height: "80vh",
            width: "80vw"
        }}
        >

          <Marker longitude={-121} latitude={40} color="red" />
      </Map>
      </>
    );
}
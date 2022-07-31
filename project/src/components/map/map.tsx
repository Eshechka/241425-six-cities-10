import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';

import { URL_MARKER_DEFAULT } from '../../const';


import { City } from '../../types/city';
import { Location } from '../../types/location';


type mapProps = {
  city: City,
  points: Location[],
};

function Map(props: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, props.city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      props.points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, props.points]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;

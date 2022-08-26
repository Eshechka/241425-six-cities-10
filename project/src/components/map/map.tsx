import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';

import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';


import { City } from '../../types/city';
import { Location } from '../../types/location';


type mapProps = {
  city: City,
  points: {
    location: Location,
    id: string,
  }[],
  activePointId?: string | null,
};

function Map(props: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, props.city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [19, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [19, 39],
  });

  useEffect(() => {
    if (map) {
      props.points
        .forEach((point) => {
          leaflet
            .marker({
              lat: point.location.latitude,
              lng: point.location.longitude,
            }, {
              icon: point.id === props.activePointId ? currentCustomIcon : defaultCustomIcon,
            })
            .addTo(map);
        });
      map.setView([props.city.location.latitude, props.city.location.longitude]);
    }
  }, [map, props.points, props.activePointId]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;

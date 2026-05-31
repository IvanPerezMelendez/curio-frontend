import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const REGION_CONFIG = {
  world:   { center: [0,   20],  scale: 140 },
  japan:   { center: [138, 37],  scale: 1400 },
  europe:  { center: [15,  52],  scale: 600  },
  usa:     { center: [-96, 38],  scale: 380  },
  spain:   { center: [-3,  40],  scale: 2200 },
  africa:  { center: [20,   5],  scale: 330  },
  latam:   { center: [-65, -15], scale: 250  },
  asia:    { center: [95,  35],  scale: 280  },
};

export default function MapClick({ exercise, onAnswer, locked, picked }) {
  const { hotspots, map_region = 'world' } = exercise;
  const { center, scale } = REGION_CONFIG[map_region] ?? REGION_CONFIG.world;

  return (
    <div className="map-wrap">
      <div className="map-svg-wrap">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center, scale }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: '#d8c9a8', stroke: '#8a7f70', strokeWidth: 0.3, outline: 'none' },
                    hover:   { fill: '#d8c9a8', stroke: '#8a7f70', strokeWidth: 0.3, outline: 'none' },
                    pressed: { fill: '#d8c9a8', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {hotspots.map((h) => {
            const isCorrect = !!h.correct;
            const isPicked  = picked === h.id;

            let markerColor = 'var(--accent)';
            if (locked) {
              if (isCorrect)     markerColor = '#4a8060';
              else if (isPicked) markerColor = '#c4503c';
            } else if (isPicked) {
              markerColor = '#c46a3d';
            }

            return (
              <Marker
                key={h.id}
                coordinates={[h.longitude ?? h.x, h.latitude ?? h.y]}
                onClick={() => !locked && onAnswer(isCorrect, h.id)}
                style={{ cursor: locked ? 'default' : 'pointer' }}
              >
                <circle
                  r={locked && isCorrect ? 8 : 6}
                  fill={markerColor}
                  fillOpacity={0.85}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
                <text
                  textAnchor="middle"
                  y={-11}
                  style={{
                    fontSize: 5,
                    fill: '#1f1b16',
                    fontFamily: 'inherit',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {h.label}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
}

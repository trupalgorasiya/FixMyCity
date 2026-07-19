import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const COLOR_MAP = {
  type1: '#3b82f6', // Blue
  type2: '#ef4444', // Red
  type3: '#10b981', // Green
  type4: '#f59e0b'  // Orange
};

const locations = [
  { id: 1, name: 'Location A', coordinates: [51.505, -0.09], type: 'type1', description: 'Category 1 Point' },
  { id: 2, name: 'Location B', coordinates: [51.51, -0.1], type: 'type2', description: 'Category 2 Point' },
  { id: 3, name: 'Location C', coordinates: [51.49, -0.08], type: 'type3', description: 'Category 3 Point' },
  { id: 4, name: 'Location D', coordinates: [51.50, -0.07], type: 'type4', description: 'Category 4 Point' }
];

const MultiPointLocation = () => {
  const defaultCenter = [51.505, -0.09];
  const zoomLevel = 13;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={zoomLevel} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => {
          const markerColor = COLOR_MAP[loc.type] || '#3b82f6';
          const [lat, lng] = loc.coordinates;
          
          // Google Map standard location pin link
          const googleMapUrl = `https://google.com{lat},${lng}`;
          console.log(lat);
          // Google Map turn-by-turn navigation link
          const directionsUrl = `https://google.com{lat},${lng}`;

          return (
            <CircleMarker
              key={loc.id}
              center={loc.coordinates}
              radius={8}
              pathOptions={{ 
                color: '#ffffff',       
                fillColor: markerColor, 
                fillOpacity: 1, 
                weight: 2 
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'sans-serif', minWidth: '160px' }}>
                  <strong style={{ fontSize: '14px' }}>{loc.name}</strong>
                  <div style={{ color: markerColor, fontWeight: 'bold', fontSize: '11px', margin: '2px 0' }}>
                    {loc.type.toUpperCase()}
                  </div>
                  <p style={{ margin: '4px 0 10px 0', color: '#555', fontSize: '12px' }}>
                    {loc.description}
                  </p>
                  
                  {/* Google Map Anchor Link */}
                  <div style={{ marginBottom: '10px' }}>
                    <a 
                      href={googleMapUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: '#1a73e8', textDecoration: 'underline' }}
                    >
                      📍 View on Google Maps
                    </a>
                  </div>
                  
                  {/* Action Button for Directions */}
                  <a 
                    href={directionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: '100%',
                      boxSizing: 'border-box',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    🚗 Get Directions
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MultiPointLocation;

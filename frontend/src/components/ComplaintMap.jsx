
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const center = {
  lat: 18.5204, // Pune (default center)
  lng: 73.8567,
};

export default function ComplaintMap({ location }) {
  const { isLoaded } = useLoadScript({
    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
console.log("My API Key:", googleApiKey); 
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  const latLng = location?.lat && location?.lng ? location : center;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={latLng} zoom={14}>
      <Marker position={latLng} />
    </GoogleMap>
  );
}

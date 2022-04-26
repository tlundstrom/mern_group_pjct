import React, { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import PlacesAutocomplete from "./PlacesAutocomplete";

const mapContainerStyle = {
	height: "50vh",
	width: "100%",
};
const libraries = ["places"];

const GoogleMaps = (props) => {
	const { selected } = props;

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyA8fRfoZnWKRVcO72JbnM4Yp-UQ-9dsqTk",
		libraries,
	});

	if (!isLoaded) return <div>Loading .....</div>;
	return <Map selected={selected} />;
};

const Map = ({ selected }) => {
	// const center = useMemo(() => ({ lat: 47.85, lng: -122.14 }), []);
	// const [selected, setSelected] = useState(center);

	return (
		<div>
			<PlacesAutocomplete setSelected={setSelected} />
			<GoogleMap zoom={10} center={selected || center} mapContainerStyle={mapContainerStyle}>
				{selected && <Marker position={selected} />}
			</GoogleMap>
		</div>
	);
};
export default GoogleMaps;

// const renderSuggestions = () =>
// 	data.map((suggestion) => {
// 		const {
// 			place_id,
// 			structured_formatting: { main_text, secondary_text },
// 		} = suggestion;
// 		return (
// 			<li key={place_id} onClick={handleSelect(suggestion)}>
// 				<strong>{main_text}</strong> <small>{secondary_text}</small>
// 			</li>
// 		);
// 	});

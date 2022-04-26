import React, { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
	height: "50vh",
	width: "100%",
};
const libraries = ["places"];
const center = { lat: 47.85, lng: -122.14 };

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
	return (
		<div>
			<GoogleMap zoom={10} center={selected || center} mapContainerStyle={mapContainerStyle}>
				{selected && <Marker position={selected} />}
			</GoogleMap>
		</div>
	);
};
export default GoogleMaps;

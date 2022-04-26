import React, { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const mapContainerStyle = {
	height: "100vh",
	width: "100vw",
};

const GoogleMaps = (props) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyA8fRfoZnWKRVcO72JbnM4Yp-UQ-9dsqTk",
		libraries: ["places"],
	});

	if (!isLoaded) return <div>Loading .....</div>;
	return <Map />;
};

const Map = () => {
	const center = useMemo(() => ({ lat: 47.85, lng: -122.14 }), []);
	const [selected, setSelected] = useState(null);

	return (
		<div>
			<PlacesAutocomplete setSelected={setSelected} />
			<GoogleMap zoom={10} center={selected} mapContainerStyle={mapContainerStyle}>
				{selected && <Marker position={selected} />}
			</GoogleMap>
		</div>
	);
};
export default GoogleMaps;

const PlacesAutocomplete = ({ setSelected }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleInput = (e) => {
		setValue(e.target.value);
	};

	const handleSelect =
		({ description }) =>
		() => {
			setValue(description, false);
			clearSuggestions();

			getGeocode({ address: description })
				.then((res) => {
					console.log(res);
					getLatLng(res[0]).then(({ lat, lng }) => {
						console.log({ lat, lng });
						setSelected({ lat, lng });
					});
				})
				.catch((err) => {
					console.log("Something went wrong retrieving the data.");
					console.log(err);
				});
		};

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;
			return (
				<li key={place_id} onClick={handleSelect(suggestion)}>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	return (
		<div>
			<input type="text" value={value} onChange={handleInput} disabled={!ready} />
			{status === "OK" && <ul>{renderSuggestions()}</ul>}
		</div>
	);
};

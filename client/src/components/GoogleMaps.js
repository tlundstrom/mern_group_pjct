import React, {useState, useMemo, useRef, useCallback}  from 'react'
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete"


const mapContainerStyle = {
height: "100vh",
width: "100vw"
};


const GoogleMaps = (props) => {
    const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCglyddQSm7Z4_i4GThv-w-2FDdgnw_3mc",   
    libraries: ["places"]    
})



if(!isLoaded) return <div>Loading .....</div>
return <Map/>
}

const Map = () => {
    const center = useMemo(() => ({lat:47.85,lng:-122.14}),[])
    const [selected, setSelected] = useState(null)

return(
    <div>
        <PlacesAutocomplete setSelected={setSelected}/>    
        <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={mapContainerStyle}
        
        >
        {selected && <Marker position={selected}/>}
        </GoogleMap>
    </div>    

    
    
    
)
}
export default GoogleMaps

const PlacesAutocomplete = ({setSelected}) => {
    const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,

} = usePlacesAutocomplete();

const handleSelect = async (e,address) => {
    e.preventDefault();
    setValue(address,false)
    clearSuggestions();

    const results= await getGeocode({address})
    const {lat,lng} = await getLatLng(results[0])
    setSelected({lat, lng})
}

return(
    <form onSubmit={handleSelect}>
        <input
        type="text"
        value={value}
        onChange={(e)=> setValue(e.target.value)} disabled={!ready}/>
        <button>Submit</button>
    </form>


)

}



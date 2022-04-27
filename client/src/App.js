import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllEvents from "./components/AllEvents";
//import EventAll from "./components/EventAll";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";
import MyEvents from "./components/MyEvents";
import GoogleMaps from "./components/GoogleMaps";
// import LoginReg from "./views/LoginReg"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [events, setEvents] = useState([]);

	return (
		<BrowserRouter>
			<div>
				<Routes>
					{/* <Route path = "/" element = {<LoginReg/>}/> */}
					<Route path="/home" element={<AllEvents events={events} setEvents={setEvents} />} />
					<Route path="/maps" element={<GoogleMaps />} />
					<Route path="/events" element={<MyEvents />} />
					<Route path="/create" element={<CreateEvent />} />
					
					{/* <Route path="/home1" element={<EventAll events={events} setEvents={setEvents} />} /> */}
					{/* <Route path = "/add" element = {<HostEvent/>}/>       
                        <Route path = "/edit/:id" element = {<EditEvent/>}/> */}

				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;

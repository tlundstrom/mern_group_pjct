import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyEvents from "../components/MyEvents";
import AllEvents from "../components/AllEvents";
import CreateEvent from "../components/CreateEvent";
// import EditEvent from "../components/EditEvent";
import GoogleMaps from "../components/GoogleMaps";
import LoginReg from "../views/LoginReg";

const AuthApp = (props) => {
	const [events, setEvents] = useState([]);
	return (
		<>
			<BrowserRouter>
				<div>
					<Routes>
						<Route path="/" element={<AllEvents events={events} setEvents={setEvents} />} />
						<Route path="/maps" element={<GoogleMaps />} />
						<Route path="/myevents" element={<MyEvents events={events} setEvents={setEvents} />} />
						{/* <Route path="/add" element={<HostEvent />} /> */}
						{/* <Route path="/edit/:id" element={<EditEvent />} /> */}
						<Route path="/CreateEvent" element={<CreateEvent />} />
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
};

export default AuthApp;

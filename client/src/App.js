import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AllEvents from './components/AllEvents';
<<<<<<< HEAD
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
=======
import GoogleMaps from './components/GoogleMaps';
// import LoginReg from "./views/LoginReg"
>>>>>>> main
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
const [events, setEvents] = useState([]);  


return (
    <BrowserRouter>
	<div>  
		<Routes>
<<<<<<< HEAD
			{/* <Route path = "/" element = {<SignInSignUp/>}/> */}
            <Route path = "/" element = {<AllEvents events = {events} setEvents = {setEvents}/>}/>     
            {/* <Route path = "/add" element = {<AddTrip/>}/>       
        	<Route path = "/edit/:id" element = {<EditTrip/>}/>
        	<Route path = "/:id" element = {<ViewTrip trips = {trips} setTrips = {setTrips}/>}/>
        	<Route path = "/user/profile/:username" element = {<Profile loggedInUser={user}/>}/>
        	<Route path="/allusers" element = {<AllUsers/>}/>        
        	<Route path="/updateuser/:username" element = {<SetProfile/>}/> */}
			<Route path = "/CreateEvent" element = {<CreateEvent/>} />
=======
			{/* <Route path = "/" element = {<LoginReg/>}/> */}
            <Route path = "/home" element = {<AllEvents events = {events} setEvents = {setEvents}/>}/>
            <Route path = "/maps" element = {<GoogleMaps/>}/>      
        {/* <Route path = "/add" element = {<HostEvent/>}/>       
        <Route path = "/edit/:id" element = {<EditEvent/>}/>
        <Route path = "/:id" element = {<ViewTrip trips = {trips} setTrips = {setTrips}/>}/>        	       
        */}
>>>>>>> main
        </Routes>
    </div>
    </BrowserRouter>    
)
}

export default App
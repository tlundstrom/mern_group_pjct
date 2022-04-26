<<<<<<< HEAD
import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AllEvents from './components/AllEvents';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import GoogleMaps from './components/GoogleMaps';
// import LoginReg from "./views/LoginReg"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

=======
import React from "react";
import "./App.css";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthApp from "./views/AuthApp";
import UnauthApp from "./views/UnauthApp";
>>>>>>> main

const App = () => {
	const { auth } = useContext(UserContext);

<<<<<<< HEAD
return (
    <BrowserRouter>
	<div>  
		<Routes>
			{/* <Route path = "/" element = {<SignInSignUp/>}/> */}
            <Route path = "/" element = {<AllEvents events = {events} setEvents = {setEvents}/>}/>     
            {/* <Route path = "/add" element = {<AddTrip/>}/>       
        	<Route path = "/edit/:id" element = {<EditTrip/>}/>
        	<Route path = "/:id" element = {<ViewTrip trips = {trips} setTrips = {setTrips}/>}/>
        	<Route path = "/user/profile/:username" element = {<Profile loggedInUser={user}/>}/>
        	<Route path="/allusers" element = {<AllUsers/>}/>        
        	<Route path="/updateuser/:username" element = {<SetProfile/>}/> */}
			<Route path = "/CreateEvent" element = {<CreateEvent/>} />
			{/* <Route path = "/" element = {<LoginReg/>}/> */}
            <Route path = "/home" element = {<AllEvents events = {events} setEvents = {setEvents}/>}/>
            <Route path = "/maps" element = {<GoogleMaps/>}/>      
        {/* <Route path = "/add" element = {<HostEvent/>}/>       
        <Route path = "/edit/:id" element = {<EditEvent/>}/>
        <Route path = "/:id" element = {<ViewTrip trips = {trips} setTrips = {setTrips}/>}/>        	       
        */}
        </Routes>
    </div>
    </BrowserRouter>    
)
}
=======
	return auth ? <AuthApp /> : <UnauthApp />;
};
>>>>>>> main

export default App;

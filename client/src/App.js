import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
//import SignInSignUp from "./views/SignInSignUp"
import AllEvents from './components/AllEvents';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
const [events, setEvents] = useState([]);  


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
        </Routes>
    </div>
    </BrowserRouter>    
)
}

export default App
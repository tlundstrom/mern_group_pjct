import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
//import LoginReg from "./views/LoginReg"
import AllEvents from './components/AllEvents';
import SignInSignUp from "./views/LoginReg"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
const [events, setEvents] = useState([]);  


return (
    <BrowserRouter>
	<div>  
		<Routes>
			{/* <Route path = "/" element = {<LoginReg/>}/> */}
            <Route path = "/home" element = {<AllEvents events = {events} setEvents = {setEvents}/>}/>     
        {/* <Route path = "/add" element = {<AddEvent/>}/>       
        <Route path = "/edit/:id" element = {<EditEvent/>}/>
        <Route path = "/:id" element = {<ViewTrip trips = {trips} setTrips = {setTrips}/>}/>        	       
        */}
        </Routes>
    </div>
    </BrowserRouter>    
)
}

export default App
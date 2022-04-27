import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// things that can become component files from this file alone: Card.js NavBar.js

const MyEvents = (props) => {
	const [myEvents, setMyEvents] = useState([]);
	const [eventDetails, setEventDetails] = useState([]);
	const [show, setShow] = useState(false);
	const [eventClickedId, setEventClickedId] = useState(null);
	const [deleted, setDeleted] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		// axios call to get all interests
		axios
			.get("/api/events/:eventId/interests")
			.then((res) => {
				console.log(res.data);
				setMyEvents(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	//
	// },[])

	// when event clicked...
	const handleClick = (e, name, location, eventDescription, img, id) => {
		e.preventDefault();
		setEventDetails({ name: name, location: location, eventDescription: eventDescription, img: img });
		setEventClickedId(id);
	};

	const handleEventButton = (e) => {
		e.preventDefault();
		setShow(!show);
	};

	// handle login.
	const logoutHandler = (e) => {
		axios
			.post(
				"http://localhost:8000/api/users/logout",
				{},

				{ withCredentials: true }
			)

			.then((res) => {
				console.log(res);
				console.log(res.data);
				navigate("/");
			})

			.catch((err) => console.log(err));
	};

	const onDeleteHandler = (e, eventId) => {
		console.log("in on delete handler.", eventId);
		axios
			.delete("http://localhost:8000/api/events/:eventId/interests/" + eventId)
			.then((res) => {
				setDeleted(!deleted);
				navigate("/events");
			})
			.catch((err) => console.log(err));
	};

	// map through events and use interest.rout as user related events. use events.getAllInterests
	return (
		<div>
			{/* simple navbar :D */}
			{/* <NavbarComponent logoutHandler={logoutHandler} handleEventButton={handleEventButton} /> */}

			<div style={{ height: "50px" }}></div>

			{/* search results */}
			<div style={{ height: "30px" }}></div>

			{/* below is the listings of the events */}
			<div className="d-flex justify-content-between w-75 mx-auto">
				<Container>
					<Row>
						<Col style={{ height: "130vh", overflowY: "scroll" }}>
							<Card className="mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
								{
									// set up interests for mapping here
									myEvents.map((event, index) => {
										return (
											<Card
												key={index}
												className="mb-5 p-3"
												style={
													eventClickedId === event.id
														? { border: "blue", borderRadius: "5px 5px 5px 5px", background: "gray" }
														: { borderRadius: "5px 5px 5px 5px" }
												}
											>
												<Row>
													<Col sm={6}>
														<Card.Img src={event.img}></Card.Img>
													</Col>

													<Col sm={6}>
														<Card.Text>
															<button
																onClick={(e) =>
																	handleClick(
																		e,
																		event.name,
																		event.location,
																		event.eventDescription,
																		event.img,
																		event.id
																	)
																}
															>
																{event.name}
															</button>
														</Card.Text>
														<Card.Text>
															{event.location}, {event.zipcode}
														</Card.Text>
														<Card.Text>{event.hostedBy}</Card.Text>
														<Card.Text>{event.eventType}</Card.Text>
														<Card.Text>{event.eventDescription.substring(0, 100)} .....</Card.Text>
														{/* buttons for edit and delete. */}
														<Link to={`/events/:eventId/interests/${event._id}`}>
															<button> edit trader</button>
														</Link>
														<button onClick={(e) => onDeleteHandler(e, event._id)}>Delete</button>
													</Col>
												</Row>
											</Card>
										);
									})
								}
							</Card>
						</Col>

						<Col>
							<Card className="mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
								<Card className="mb-5">
									<Row>
										<Col>
											<Card.Img src={eventDetails?.img}></Card.Img>
										</Col>
										<Col>
											<Card.Text>{eventDetails?.name}</Card.Text>
											<Card.Text>{eventDetails?.location}</Card.Text>
										</Col>
									</Row>
								</Card>

								{/* <Card className="mb-5">
                    <Card.Img 
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFlMBcV79owv9LG8m93RFJ13FghwopNWLfw&usqp=CAU"}></Card.Img>
    
                </Card> */}

								<Card>
									<Card.Text>{eventDetails.eventDescription}</Card.Text>
								</Card>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			{/* <input type="search" onChange={(e) => handleSearch(e.target.value)}/>
            <h1>{filteredName}</h1> */}
		</div>
	);
};

export default MyEvents;

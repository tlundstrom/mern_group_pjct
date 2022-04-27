import React, { useContext, useState, useEffect, useMemo } from "react";
// import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import GoogleMaps from "./GoogleMaps";
// import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { useNavigate } from "react-router-dom";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import NavBarComponent from "./NavBarComponent";
// import { UserContext } from "../contexts/UserContext";
import axios from "axios";



const AllEvents = ({ events, setEvents }) => {
	// const { logout } = useContext(UserContext);
	const [eventDetails, setEventDetails] = useState([]);
	const [show, setShow] = useState(false);
	const [eventClickedId, setEventClickedId] = useState(null);
	const [interest, setInterest] = useState({ going: false, interested: false });
	const [searchZipCode, setSearchZipCode] = useState("");
	const [searchCategory, setSearchCategory] = useState("");
	const [searchDate, setSearchDate] = useState("");
	const [searchResult, setSearchResult] = useState([]);


	const [queryFound, setQueryFound] = useState(false);

	// setting up the center position fro google map
	const center = useMemo(() => ({ lat: 47.85, lng: -122.14 }), []);
	const [selected, setSelected] = useState(center);

	// const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/events")
			.then((res) => {
				setEvents(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const handleCheck = (e, id) => {
		console.log(id);
		e.target.name === "going" ? handleGoing(id) : handleInterested(id);
		axios
			.post(`http://localhost:8000/api/events/${id}/interests/create`, interest, { withCredentials: true })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleGoing = (id) => {
		console.log("handleGoing");
		setInterest({ going: !interest.going, interested: false });
	};
	const handleInterested = (id) => {
		console.log("handleInterested");
		setInterest({ interested: !interest.interested, going: false });
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		const result = events.filter((event, i) => {
			return event.zipcode === searchZipCode && event.eventType === searchCategory && event.date === searchDate;
		});
		console.log(result);
		setSearchResult(result);
		setQueryFound(true);
	};


	const handleClick = (e, name, location, description, img, createdBy, id) => {
		e.preventDefault();
		setEventDetails({ name: name, location: location, description: description, img: img, createdBy: createdBy });
		setEventClickedId(id);
	};


	const handleSelectLocation = (e, location, idFromClickedLocation) => {
		e.preventDefault();
		console.log(location);
		//setClickedLocation(location)

		getGeocode({ address: location })
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

	

	

	return (
		<div>
			<NavBarComponent />
			<div style={{ height: "50px" }}></div>

			{/* show the forms only when "find my events" are clicked */}
			{/* they are hidden otherwise */}
			{show && (
				<Form className=" mt-4" onSubmit={handleSubmit}>
					<Container>
						<Row>
							<Col>
								<Form.Group controlId="formBasicSelect" className="mt-4">
									{/* <Form.Label>Pick a Date</Form.Label> */}
									<Form.Control type="date" name="date" placeholder="Pick a date" onChange={(e) => setSearchDate(e.target.value)} />
								</Form.Group>
							</Col>

							<Col>
								{/* <Card className="w-50 mt-4"> */}
								<Form.Group controlId="formBasicSelect" className="mt-4">
									<Form.Select aria-label="Default select example" onChange={(e) => setSearchCategory(e.target.value)}>
										<option>Select a category</option>
										<option value="Arts">Arts</option>
										<option value="Books">Books</option>
										<option value="Movie">Movie</option>
										<option value="Music">Music</option>
										<option value="Nature">Nature</option>
										<option value="Food">Food</option>
										<option value="Sports">Sports</option>
									</Form.Select>
								</Form.Group>
								{/* </Card> */}
							</Col>

							<Col>
								<Form.Group controlId="formBasicSelect" className=" mt-4">
									<Form.Control
										aria-label="Default select example"
										type="search"
										placeholder="Enter a Zipcode"
										onChange={(e) => setSearchZipCode(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group className=" mt-4">
									<button className="btn btn-secondary">Submit</button>
								</Form.Group>
							</Col>
						</Row>
					</Container>
				</Form>
			)}

			<div style={{ height: "30px" }}></div>

			{searchResult?.map((event, i) => {
				return <p>{event.zipcode}</p>;
			})}

			<div className="d-flex justify-content-between w-75 mx-auto">
				<Container>
					<Row>
						<Col style={{ height: "130vh", overflowY: "scroll" }} sm={6}>
							<Card className="mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
								{queryFound
									? searchResult.map((event, index) => {
											return (
												<Card
													key={index}
													className="mb-5 p-3 border-primary"
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
															<Card.Title className="hover">
																<h1
																	onClick={(e) => {
																		handleClick(
																			e,
																			event.name,
																			event.location.streetAddress,
																			event.eventDescription,
																			event.img,
																			event.hostedBy,
																			event.id
																		);
																	}}
																>
																	{event.name}
																</h1>
															</Card.Title>

															<Card.Title style={{ color: "gray" }}># {event.category}</Card.Title>

															{/* <Card.Text onClick={(e) => {handleSelect(event.location)}}>{event.location}-{event.zipcode}</Card.Text>  */}
															<Card.Title
																onClick={(e) => handleSelectLocation(e, event.location.streetAddress, event.id)}
															>
																{event.location.streetAddress}
															</Card.Title>

															<Card.Title>Host: {event.hostedBy}</Card.Title>

															<Card.Title>
																{event.eventDescription.substring(0, 100)}
																..... <span style={{ color: "blue" }}>details</span>
															</Card.Title>
														</Col>
													</Row>

													<Row>
														{/* <Form className="mx-auto mt-4">
                                <Form.Group>
                                    <Form.Check
                                    type="checkbox"
                                    label="Interested" 
                                    inline
                                    checked={event.interested}
                                    onChange= {(e) => {
                                        let checked = e.target.checked;
                                        console.log(checked)
                                        setEvents(events.map((evnt) => {
                                            if(evnt.id === event.id) {
                                                event.interested = checked
                                            }
                                            return evnt
                                        })
                                        )
                                        }}
                                    />
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Check
                                    type="checkbox"
                                    label="Going"  
                                    inline
                                    checked={event.going} 
                                    onChange= {(e) => {
                                        let checked = e.target.checked;
                                        setEvents(events.map((evnt) => {
                                            if(evnt.id === event.id) {
                                                event.going = checked
                                            }
                                            return evnt
                                        })
                                        )
                                        }}      
                                />
                                </Form.Group>
                            
                            </Form> */}

														<Form className="mx-auto mt-4 d-flex p-2">
															<Form.Group>
																<Form.Check
																	type="checkbox"
																	label="Interested"
																	inline
																	checked={event.interested}
																	onChange={(e) => handleCheck(e, event._id)}
																/>
															</Form.Group>

															<Form.Group>
																<Form.Check
																	type="checkbox"
																	label="Going"
																	inline
																	checked={event.going}
																	onChange={(e) => handleCheck(e, event._id)}
																/>
															</Form.Group>
														</Form>
													</Row>
												</Card>
											);
									})
									: events.map((event, index) => {
											return (
												<Card
													key={index}
													className="mb-5 p-3 shadow"
													style={
														eventClickedId === event.id
															? { borderRadius: "5px 5px 5px 5px", background: "lightgray" }
															: { borderRadius: "5px 5px 5px 5px" }
													}
												>
													<Row>
														<Col sm={6}>
															<Card.Img src={event.img || null}></Card.Img>
														</Col>

														<Col sm={6}>
															<Card.Title className="event-name">
																<h1
																	onClick={(e) => {
																		handleClick(
																			e,
																			event.name,
																			event.location.streetAddress,
																			event.description,
																			event.img,
																			event.createdBy,
																			event.id
																		);
																	}}
																>
																	{event.name}
																</h1>
															</Card.Title>

															<Card.Title># {event.eventType}</Card.Title>
															{/* <Card.Text onClick={(e) => {handleSelect(event.location)}}>{event.location}-{event.zipcode}</Card.Text>  */}
															<Card.Title
																onClick={(e) => handleSelectLocation(e, event.location.streetAddress, event.id)}
															>
																{event.location.streetAddress}
															</Card.Title>

															<Card.Title> Host: {event.createdBy.name}</Card.Title>

															<Card.Title>
																{event.description.substring(0, 100)}
																..... <span style={{ color: "blue" }}>details</span>
															</Card.Title>
														</Col>
													</Row>

													<Row>
														{/* <Form className="mx-auto mt-4 d-flex p-2">
                                <Form.Group>
                                    <Form.Check
                                    type="checkbox"
                                    label="Going"  
                                    inline
                                    checked={event.going} 
                                    onChange= {(e) => {
                                        let checked = e.target.checked;
                                        setEvents(events.map((evnt) => {
                                            if(evnt.id === event.id) {
                                                event.going = checked
                                            }
                                            return evnt
                                        })
                                        )
                                        }}      
                                />
                                </Form.Group>
                            
                                <Form.Group>
                                    <Form.Check
                                    type="checkbox"
                                    label="Interested" 
                                    inline
                                    checked={event.interested}
                                    onChange= {(e) => {
                                        let checked = e.target.checked;
                                        console.log(checked)
                                        setEvents(events.map((evnt) => {
                                            if(evnt.id === event.id) {
                                                event.interested = checked
                                            }
                                            return evnt
                                        })
                                        )
                                        }}
                                    />
                                </Form.Group>
                                
                                
                            </Form> */}

														<Form className="mx-auto mt-4 d-flex p-2">
															<Form.Group>
																<Form.Check
																	type="checkbox"
																	label="Interested"
																	inline
																	name="interested"
																	checked={interest.interested}
																	onChange={(e) => handleCheck(e, event._id)}
																/>
															</Form.Group>

															<Form.Group>
																<Form.Check
																	type="checkbox"
																	label="Going"
																	inline
																	name="going"
																	checked={interest.going}
																	onChange={(e) => handleCheck(e, event._id)}
																/>
															</Form.Group>
														</Form>
													</Row>
												</Card>
											);
									})}
							</Card>
						</Col>

						<Col sm={6}>
							<Card className="mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
								{eventClickedId ? (
									<Card className="mb-5">
										<Row>
											<Col>
												<Card.Img src={eventDetails?.img}></Card.Img>
											</Col>
											<Col>
												<Row>
													<Card.Title>{eventDetails?.name}</Card.Title>
													<Card.Title>{eventDetails?.location.streetAddress}</Card.Title>
												</Row>

												<Row>
													<Card.Title>{eventDetails?.createdBy}</Card.Title>
												</Row>
											</Col>
										</Row>
									</Card>
								) : (
									// Loads the information of latest event when no event is selected
									<Card className="mb-5">
										<Row>
											<Col>
												<Card.Img src={events[0]?.img}></Card.Img>
											</Col>
											<Col>
												<Row>
													<Card.Title>{events[0]?.name}</Card.Title>
													<Card.Title>{events[0]?.location.streetAddress}</Card.Title>
												</Row>
												<Row>
													<Card.Title>{events[0]?.hostedBy}</Card.Title>
												</Row>
											</Col>
										</Row>
									</Card>
								)}

								<Card className="mb-5">
									<GoogleMaps selected={selected} />
								</Card>

								{eventClickedId ? (
									<Card>
										<Card.Title>{eventDetails.description}</Card.Title>
									</Card>
								) : (
									// Loads the information of latest event when no event is selected
									<Card>
										<Card.Title>{events[0]?.description}</Card.Title>
									</Card>
								)}
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

export default AllEvents;

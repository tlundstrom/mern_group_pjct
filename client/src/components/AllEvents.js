import React, { useContext, useState, useEffect, useMemo } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import GoogleMaps from "./GoogleMaps";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { getGeocode, getLatLng } from "use-places-autocomplete";
//import NavbarComponent from "./NavbarComponent";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const eventslist = [
	{
		id: 1,
		name: "Event 1",
		// location:"San Francisco,CA 94118",
		date: "2022-04-27",
		location: "San Francisco, CA, USA",
		zipcode: "94118",
		hostedBy: "User 1",
		eventType: "Food",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. Faucibus et molestie ac feugiat sed. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. A lacus vestibulum sed arcu non odio euismod. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Nunc sed blandit libero volutpat sed cras ornare arcu dui. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 2,
		name: "Event 2",
		// location:"Folsome,CA 95761",
		date: "2022-05-15",
		location: "Folsom,CA,USA",
		zipcode: "95761",
		hostedBy: "User 2",
		eventType: "Music",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. Faucibus et molestie ac feugiat sed. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. A lacus vestibulum sed arcu non odio euismod. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Nunc sed blandit libero volutpat sed cras ornare arcu dui. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 3,
		name: "Event 3",
		// location:"Palo Alto,CA 94020",
		date: "2022-07-22",
		location: "Palo Alto,CA,USA",
		zipcode: "94020",
		hostedBy: "User3",
		eventType: "Movie",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 4,
		name: "Event 4",
		// location:"San Jose,CA 95101",
		location: "San Jose,CA,USA",
		date: "2022-08-23",
		zipcode: "95101",
		hostedBy: "User4",
		eventType: "Sports",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 5,
		name: "Event 5",
		// location:"Pleasanton,CA 94588",
		location: "Pleasanton,CA,USA",
		date: "2022-05-29",
		zipcode: "94588",
		hostedBy: "User5",
		eventType: "Nature",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 6,
		name: "Event 6",
		// location:"San Jose,CA 95110",
		location: "San Jose,CA,USA",
		date: "2022-06-09",
		zipcode: "95110",
		hostedBy: "User6",
		eventType: "Arts",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 7,
		name: "Event 7",
		// location:"San Jose,CA 95101",
		location: "San Jose,CA,USA",
		date: "2022-06-29",
		zipcode: "95101",
		hostedBy: "User7",
		eventType: "Music",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://crosscut.com/sites/default/files/styles/max_992x992/public/images/articles/victoriaholt_upstream_03.jpg?itok=W0AS5yzI",
	},

	{
		id: 8,
		name: "Event 8",
		// location:"Pleasanton,CA 94588",
		location: "Pleasanton,CA,USA",
		date: "2022-09-19",
		zipcode: "94588",
		hostedBy: "User8",
		eventType: "Movie",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},

	{
		id: 9,
		name: "Event 9",
		// location:"San Jose,CA 95054",
		location: "San Jose,CA,USA",
		date: "2022-06-28",
		zipcode: "95054",
		hostedBy: "User9",
		eventType: "Food",
		eventDescription:
			"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ",
		img: "https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg",
	},
];

const AllEvents = ({ events, setEvents }) => {
	const { logout } = useContext(UserContext);
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

	const navigate = useNavigate();

	// useEffect(() => {
	// 	setEvents(
	// 		eventslist.map((evnt) => {
	// 			return {
	// 				interested: false,
	// 				going: false,
	// 				id: evnt.id,
	// 				name: evnt.name,
	// 				date: evnt.date,
	// 				location: evnt.location,
	// 				zipcode: evnt.zipcode,
	// 				hostedBy: evnt.hostedBy,
	// 				eventType: evnt.eventType,
	// 				eventDescription: evnt.eventDescription,
	// 				img: evnt.img,
	// 			};
	// 		})
	// 	);
	// }, []);

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

	// useEffect (() => {
	//         axios.get("http://localhost:8000/api/events")
	//         .then((res) => {
	//             //setIsLoading(true);
	//             console.log(res.data);
	//             setEvents(res.data);
	//            // setIsLoading(false);
	//         })
	//         .catch((err) => console.log(err))
	//     }, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		const result = events.filter((event, i) => {
			return event.zipcode === searchZipCode && event.eventType === searchCategory && event.date === searchDate;
		});
		console.log(result);
		setSearchResult(result);
		setQueryFound(true);
	};

	//
	// },[])

	const handleClick = (e, name, location, description, img, createdBy, id) => {
		e.preventDefault();
		setEventDetails({ name: name, location: location, description: description, img: img, createdBy: createdBy });
		setEventClickedId(id);
	};

	// const handleSearch = (newSearchQuery) => {
	//     setSearchQuery(newSearchQuery)
	//     lists.map((list) => {
	//         if (list.includes(searchQuery)) {
	//             setFilteredName(list)
	//         }

	//     })
	//     setSearchQuery("")
	// }

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

	const handleEventButton = (e) => {
		e.preventDefault();
		setShow(!show);
	};

	// const handleCheckedGoing = (eventObj) => {
	// 	eventObj.going = !eventObj.going;
	// 	setEvents([...events]);
	// };

	// const handleCheckedInterested = (eventObj) => {
	// 	eventObj.interested = !eventObj.interested;
	// 	setEvents([...events]);
	// };

	const logoutHandler = (e) => {
		axios
			.post(
				"http://localhost:8000/api/users/logout",
				{},

				{ withCredentials: true }
			)

			.then((res) => {
				logout();
				console.log(res);
				console.log(res.data);
				navigate("/");
			})

			.catch((err) => console.log(err));
	};

	return (
		<div>
			{/* <NavbarComponent logoutHandler={logoutHandler} handleEventButton={handleEventButton}/> */}
			<Navbar className="bg-light" expand="lg" fixed="top">
				<Container>
					<Navbar.Brand className="mx-5">My Eventbook</Navbar.Brand>

					<Navbar.Collapse className="d-flex justify-content-around">
						<Link to={"/"} className="me-5">
							<button onClick={(e) => handleEventButton(e)} style={{ color: "gray", border: "none", background: "none" }}>
								Find events near me
							</button>
						</Link>

						<Link to={"/create"} className="me-5">
							<button style={{ color: "gray", border: "none", background: "none" }}>Host event</button>
						</Link>

						<Link to={"/events"} style={{ textDecoration: "none", color: "gray" }}>
							<button style={{ border: "none", color: "gray", background: "none" }} className="me-5">
								My events
							</button>
						</Link>

						<Link to={"/"} className="me-5">
							<img
								style={{ height: "50px", width: "50px" }}
								src={
									"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
								}
							></img>
						</Link>

						<button onClick={logoutHandler} style={{ color: "gray", border: "none", background: "none" }}>
							Logout
						</button>
					</Navbar.Collapse>
				</Container>
			</Navbar>

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
															<Card.Text className="hover">
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
															</Card.Text>

															<Card.Text style={{ color: "gray" }}># {event.category}</Card.Text>

															{/* <Card.Text onClick={(e) => {handleSelect(event.location)}}>{event.location}-{event.zipcode}</Card.Text>  */}
															<Card.Text
																onClick={(e) => handleSelectLocation(e, event.location.streetAddress, event.id)}
															>
																{event.location.streetAddress}
															</Card.Text>

															<Card.Text>Host: {event.hostedBy}</Card.Text>

															<Card.Text>
																{event.eventDescription.substring(0, 100)}
																..... <span style={{ color: "blue" }}>details</span>
															</Card.Text>
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
															<Card.Text className="event-name">
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
															</Card.Text>

															<Card.Text># {event.eventType}</Card.Text>
															{/* <Card.Text onClick={(e) => {handleSelect(event.location)}}>{event.location}-{event.zipcode}</Card.Text>  */}
															<Card.Text
																onClick={(e) => handleSelectLocation(e, event.location.streetAddress, event.id)}
															>
																{event.location.streetAddress}
															</Card.Text>

															<Card.Text> Host: {event.createdBy.name}</Card.Text>

															<Card.Text>
																{event.description.substring(0, 100)}
																..... <span style={{ color: "blue" }}>details</span>
															</Card.Text>
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
													<Card.Text>{eventDetails?.name}</Card.Text>
													<Card.Text>{eventDetails?.location.streetAddress}</Card.Text>
												</Row>

												<Row>
													<Card.Text>{eventDetails?.createdBy}</Card.Text>
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
													<Card.Text>{events[0]?.name}</Card.Text>
													<Card.Text>{events[0]?.location.streetAddress}</Card.Text>
												</Row>
												<Row>
													<Card.Text>{events[0]?.hostedBy}</Card.Text>
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
										<Card.Text>{eventDetails.description}</Card.Text>
									</Card>
								) : (
									// Loads the information of latest event when no event is selected
									<Card>
										<Card.Text>{events[0]?.description}</Card.Text>
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

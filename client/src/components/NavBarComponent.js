import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const NavBarComponent = (props)=> {
	const {events,searchZipCode,searchCategory,searchDate,searchResult,setQueryFound,setSearchDate,setSearchCategory,setSearchZipCode,setSearchResult} = props;
	const navigate = useNavigate();
	const { logout } = useContext(UserContext);
	const [show, setShow] = useState(false);
	
	
	
	const handleEventButton = (e) => {
		e.preventDefault();
		setShow(!show);
	};
	
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const result = events.filter((event, i) => {
			return event.zipcode === searchZipCode && event.eventType === searchCategory && event.date === searchDate;
		});
		console.log(result);
		setSearchResult(result);
		setQueryFound(true);
	};


return(
	<div>
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
			{/* this  v  may or may not be needed here. */}
			{searchResult?.map((event, i) => {
				return <p>{event.zipcode}</p>;
			})}
	</div>
			
)
    
}
export default NavBarComponent
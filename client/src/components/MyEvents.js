import React, {useState, useEffect} from 'react'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const MyEvents = (props) =>{

    const {events, setEvents} = props;
    const [eventDetails, setEventDetails] = useState([]);
    const [show, setShow] = useState(false);
    const [eventClickedId, setEventClickedId] = useState(null)
    
    // const [searchQuery, setSearchQuery] = useState("")
    // const [filteredName, setFilteredName] = useState("")
    const [searchZipCode, setSearchZipCode] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [queryFound, setQueryFound] = useState(false)
    const [status, setStatus] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        // axios call to get all interests
        axios.get("/api/events/:eventId/interests")
        .then(res => {
            console.log(res.data)
            setEvents(res.data);
        })
        .catch((err)=>console.log(err))
    },[])

// handle searching from my events page. copied from all events.
const handleSubmit = (e) => {
    e.preventDefault();
    const result = events.filter((event, i) => {
    return (event.zipcode === searchZipCode && event.eventType === searchCategory && event.date === searchDate)    
})
console.log(result)
setSearchResult(result);
setQueryFound(true);
}
    
// 
// },[])

// when event clicked...
const handleClick = (e,name, location, eventDescription, img, id) => {
    e.preventDefault();
    setEventDetails({name: name, location: location, eventDescription: eventDescription, img: img});
    setEventClickedId(id);
}

//toggle showing something
const handleEventButton = (e) => {
    e.preventDefault();
    setShow(!show);
}

// handle login.
const logoutHandler = (e) => {
        axios.post("http://localhost:8000/api/users/logout",
        {},

        { withCredentials:true },

        )

        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })

        .catch((err) => console.log(err)
        )

    }
// map through events and use interest.rout as user related events. use events.getAllInterests
    return (
        //copied from all events, very much the same setup, but we pull from a user collection, not just everything.
        <div>
            {/* these components could easily be their own js files to shorten up this kind of code. */}
            <Navbar className="bg-light" expand="lg" fixed="top"> 
                        <Container>
                            <Navbar.Brand className="mx-5">My Eventbook</Navbar.Brand>  
                        
                            <Navbar.Collapse className="d-flex justify-content-around">  
                                <Link to={"/"} 
                                className = "me-5">
                                    <button onClick={(e) => handleEventButton(e)}                          
                                style={{color:"gray",border:"none", background:"none"}}>
                                    Find events near me
                                </button>
                                </Link>  
    
                                <Link to={"/add"} 
                                className="me-5">
                                    <button                             
                                style={{color:"gray",border:"none", background:"none"}}>
                                    Host event
                                </button>
                                    
                                </Link>                                                                                   
                                
                                <Link to = {"/"} 
                                style={{textDecoration: "none", color:"gray"}}>
                                    <button                          
                                style={{border:"none",color:"gray", background:"none"}} className="me-5">
                                    My events
                                </button>
                                </Link>
    
                                <Link to={"/"} 
                                className = "me-5">
                                    <img 
                                    style={{height:"50px", width:"50px"}} 
                                    src={"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="}>
    
                                    </img>
                                </Link>                            
    
                                <button onClick={logoutHandler} 
                                
                                style={{color:"gray",border:"none", background:"none"}}>
                                    Logout
                                </button> 
                                
                            </Navbar.Collapse>
                        </Container>                                             
            </Navbar>
    
            <div style={{height:"50px"}}></div>  
    
            {show && 
            
            <Form  className=" mt-4" onSubmit={handleSubmit}>
                <Container>
    
                
                    <Row>
                        <Col>
                        
                            <Form.Group controlId="formBasicSelect" className="mt-4">
                                {/* <Form.Label>Pick a Date</Form.Label> */}
                                <Form.Control 
                                type="date" 
                                name="date" 
                                placeholder="Pick a date" 
                                onChange={(e) => setSearchDate(e.target.value)}/>                
                            
                            </Form.Group>
                        
                        </Col>
    
                        <Col>
                        {/* <Card className="w-50 mt-4"> */}
                        <Form.Group controlId="formBasicSelect" className="mt-4">
                            <Form.Select aria-label="Default select example" onChange= {(e) => setSearchCategory(e.target.value)}>
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
                            <Form.Select aria-label="Default select example" onChange= {(e) => setSearchZipCode(e.target.value)}>
                                <option>Select a zipcode</option>
                                <option value="94118">94118</option>
                                <option value="95761">95761</option>
                                <option value="94020">94020</option>
                                <option value="95101">95101</option>
                                <option value="95110">95110</option>
                                <option value="94588">94588</option> 
                                <option value="95054">95054</option>                 
                            </Form.Select>                
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
        
            }
    {/* search results */}
            <div style={{height:"30px"}}></div> 
    
            {searchResult?.map((event,i) => {
                return (
                <p>{event.zipcode}</p>
                )
            }) }
    {/* below is the listings of the events */}
            <div className="d-flex justify-content-between w-75 mx-auto">
                <Container>
                    <Row>
                        <Col style={{height:"130vh",overflowY: "scroll"}}>
                        <Card className="mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
                            
                        
            { 
            // set up interests for mapping here
                events.map((event, index) => {
                    return (
                        <Card key = {index} className="mb-5 p-3" style={eventClickedId === event.id? {border:"blue", borderRadius:"5px 5px 5px 5px", background:"gray"}: {borderRadius:"5px 5px 5px 5px"}}>
                            <Row>
                                <Col sm={6}>
                                <Card.Img src={event.img}></Card.Img>
                                </Col>
    
                                <Col sm={6}>
                                <Card.Text><button onClick= {(e) => handleClick(e,event.name, event.location, event.eventDescription,event.img, event.id)}>{event.name}</button></Card.Text> 
                                <Card.Text>{event.location}, {event.zipcode}</Card.Text> 
                                <Card.Text>{event.hostedBy}</Card.Text> 
                                <Card.Text>{event.eventType}</Card.Text> 
                                <Card.Text>{event.eventDescription.substring(0,100)} .....</Card.Text> 
                                
                                </Col>
                            
                            </Row>
    
                            {/* <Row>
                                <Form className="mx-auto mt-4">
                                    <Form.Group>
                                        <Form.Check 
                                        className="me-5" 
                                        inline
                                        name="status" 
                                        value="interested" 
                                        label="Interested" 
                                        checked = {status === "interested"}
                                        onChange = {(event) = setStatus(event.target.value)}
                                        type="radio"/>
    
                                        <Form.Check 
                                        className="me-5" 
                                        name="status" 
                                        value="going" 
                                        label="Going" 
                                        checked = {status === "going"}
                                        onChange = {(event) = setStatus(event.target.value)}
                                        inline 
                                        type="radio"/>
    
                                        <Form.Check  
                                        name="status" 
                                        value="not going" 
                                        label="Not Going" 
                                        checked = {status === "not going"}
                                        onChange = {(event) = setStatus(event.target.value)}
                                        inline 
                                        type="radio"/>
                                    </Form.Group>
                                </Form>
                            </Row> */}
                        </Card>
                        
    
                    )
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
    
                <Card className="mb-5">
                    <Card.Img 
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFlMBcV79owv9LG8m93RFJ13FghwopNWLfw&usqp=CAU"}></Card.Img>
    
                </Card>
                
    
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
    )

}

export default MyEvents
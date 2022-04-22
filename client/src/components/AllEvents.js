import React, {useState} from 'react'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const events = [
{name:"Event 1", 
location:"San Francisco,CA 94118", 
hostedBy: "User1", 
eventType: "Food", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. Faucibus et molestie ac feugiat sed. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. A lacus vestibulum sed arcu non odio euismod. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Nunc sed blandit libero volutpat sed cras ornare arcu dui. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"},

{name:"Event 2", 
location:"Folsome,CA 95761", 
hostedBy: "User2", 
eventType: "Music", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. Faucibus et molestie ac feugiat sed. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. A lacus vestibulum sed arcu non odio euismod. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Nunc sed blandit libero volutpat sed cras ornare arcu dui. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"},

{name:"Event 3", 
location:"Palo Alto,CA 94020", 
hostedBy: "User3", 
eventType: "Movie", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"
},

{name:"Event 4", 
location:"San Jose,CA 95101", 
hostedBy: "User4", 
eventType: "Sports", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"
},

{name:"Event 5", 
location:"Pleasanton,CA 94588", 
hostedBy: "User5", 
eventType: "Nature", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"
},

{name:"Event 6", 
location:"San Jose,CA 95110", 
hostedBy: "User6", 
eventType: "Arts", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"},

{
name:"Event 7", 
location:"San Jose,CA 95101", 
hostedBy: "User7", 
eventType: "Music", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"
},

{
name:"Event 8", 
location:"Pleasanton,CA 94588", 
hostedBy: "User8", 
eventType: "Movie", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"
},

{name:"Event 9", 
location:"San Jose,CA 95054", 
hostedBy: "User9", 
eventType: "Food", 
eventDescription:"Leo a diam sollicitudin tempor id eu nisl. Nunc scelerisque viverra mauris in. Enim blandit volutpat maecenas volutpat blandit. Id cursus metus aliquam eleifend mi in nulla posuere. ", 
img:"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"},
]




const AllEvents = (props) => {

const [eventDetails, setEventDetails] = useState([]);
const [show, setShow] = useState(false);

const handleClick = (e,name, location, eventDescription) => {
    e.preventDefault();
    setEventDetails({name:name, location:location, eventDescription:eventDescription});
}

const handleEventButton = (e) => {
    e.preventDefault();
    setShow(!show);
}

return (
    <div>
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

                            <Link to={"/"} 
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

                            <button 
                            
                            style={{color:"gray",border:"none", background:"none"}}>
                                Logout
                            </button> 
                            
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>

        <div style={{height:"50px"}}></div>  

        {show && 
        <Form className="w-75 mx-auto">
                <Row>
                    <Col>
                    
                        <Form.Group controlId="formBasicSelect" className="w-50 mt-4">
                            {/* <Form.Label>Pick a Date</Form.Label> */}
                            <Form.Control type="date" name="date" placeholder="Pick a date"/>                
                        </Form.Group>
                    
                    </Col>

                    <Col>
                    {/* <Card className="w-50 mt-4"> */}
                    <Form.Group controlId="formBasicSelect" className="w-50 mt-4">
                        <Form.Select aria-label="Default select example">
                            <option>Select a category</option>
                            <option value="Arts">Arts</option>
                            <option value="Books">Books</option>
                            <option value="Music">Movie</option>
                            <option value="Music">Music</option>
                            <option value="Nature">Nature</option>
                            <option value="Nature">Sports</option>  
                        </Form.Select>                
                    </Form.Group>
                    {/* </Card> */}
                    </Col>
                

                <Col>
                
                    <Form.Group controlId="formBasicSelect" className="w-50 mt-4">
                        <Form.Select aria-label="Default select example">
                            <option>Select a zipcode</option>
                            <option value="10000">10000</option>
                            <option value="20000">20000</option>
                            <option value="30000">30000</option>
                            <option value="40000">40000</option>
                            <option value="50000">50000</option>                  
                        </Form.Select>                
                    </Form.Group>
                
                </Col>
        

                </Row>
            

        </Form>
        }

        <div style={{height:"30px"}}></div> 

        <div className="d-flex justify-content-between w-75 mx-auto">
            <Container>
                <Row>
                    <Col style={{height:"130vh",overflowY: "scroll"}}>
                    <Card className="mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
                    
        {
            events.map((event, index) => {
                return (
                    <Card key = {index} className="mb-5">
                        <Row>
                            <Col sm={6}>
                            <Card.Img src={event.img}></Card.Img>
                            </Col>

                            <Col sm={6}>
                            <Card.Text><button onClick= {(e) => handleClick(e,event.name, event.location, event.eventDescription)} style={{color:"gray",border:"none", borderRadius:"5px 5px 5px 5px", background:"white"}}>{event.name}</button></Card.Text> 
                            <Card.Text>{event.location}</Card.Text> 
                            <Card.Text>{event.hostedBy}</Card.Text> 
                            <Card.Text>{event.eventType}</Card.Text> 
                            <Card.Text>{event.eventDescription.substring(0,100)} .....</Card.Text> 
                            </Col>
                        
                        </Row>
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
                    <Card.Img src={"https://png.pngtree.com/png-clipart/20200826/ourmid/pngtree-world-food-day-hand-painted-chopping-board-food-fruits-and-vegetables-png-image_2333082.jpg"}></Card.Img>
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
                <Card.Text>{eventDetails?.eventDescription}</Card.Text> 
            </Card>

        </Card>

        </Col>

        </Row>

        </Container>
        </div>
    </div>
)
}

export default AllEvents
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Modal from "react-bootstrap/Modal";


const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const {show, handleClose} = props;


    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
            
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                setEmail("");   
                setPassword("");            
                navigate("/home");                
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div>
            <Modal showOverlay={false} show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title style={{margin:"auto"}}>
                        Sign in
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    
                    <form onSubmit={login}>
                        <FormGroup className="mt-2">
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control
                            type="text"
                            name="email"
                            value={email}
                            placeholder = "Email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="mt-4">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder = "Password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>

                        <p className="error-text mt-2" style={{color:"red"}}>{errorMessage ? errorMessage : ""}</p>

                        <button  
                        className="mt-2" 
                        style={{
                            background:"#0d6efd", 
                            width:"470px", 
                            height: "40px", 
                            color:"#ffffff", 
                            borderRadius: "5px", 
                            border:"none"}}>
                                Sign In
                        </button> 
                                    
                    </form>
        
                </Modal.Body>


                {/* <Modal.Footer>
                    <p>Do not have an account? Sign Up</p>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}>SignIn</Button> *
                </Modal.Footer> */}
    
            </Modal>     
            
        </div>
    );
};


export default SignIn
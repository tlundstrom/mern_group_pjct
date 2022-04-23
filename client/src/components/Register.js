import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Modal from "react-bootstrap/Modal";


const Register = (props) => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [confirmReg, setConfirmReg] = useState(false);
    const [errors, setErrors] = useState({});

    const {show, setShowSignIn, handleShow, handleClose} = props;


    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            {
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
            },
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                
                setConfirmReg(
                    true
                    
                );
                setErrors({}); 
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })

    }


    return (
        <div>     

            {/* using the Modal to display the Sign up pop up */}

            <Modal showOverlay={false} show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title style={{margin:"auto"}}>
                        Register
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    

                    <form onSubmit={register}>
                        <FormGroup className="mt-2">                            
                            <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            placeholder = "User Name"
                            onChange={(e) => setUserName(e.target.value)}
                            />

                            {errors.username ? (
                                <span className="error-text">
                                    {errors.username.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <FormGroup className="mt-4">                            
                            <Form.Control
                            type="text"
                            name="email"
                            value={email}
                            placeholder = "Email"
                            onChange={(e) => setEmail(e.target.value)}
                            />

                            {errors.email ? (
                                <span className="error-text">
                                    {errors.email.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <FormGroup className="mt-4">                            
                            <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder = "Password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            {errors.password ? (
                                <span className="error-text">
                                    {errors.password.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <FormGroup className="mt-4">                            
                            <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder = "Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            
                            {errors.confirmPassword ? (
                                <span className="error-text">
                                    {errors.confirmPassword.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <button 
                        className="mt-4"
                        style={{background:"#0d6efd", width:"470px", height: "40px", color:"#ffffff", borderRadius: "5px", border:"none", marginTop:"8px"}}>
                            Register
                        </button>
            
                    </form>

                    {confirmReg ? <p className ="text-primary">Thank you for signing up, you can sign in now </p> : null}
        
                </Modal.Body>


                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}>SignIn</Button> 
                </Modal.Footer> */}
    
            </Modal> 
    

        </div>
    )
}


export default Register;
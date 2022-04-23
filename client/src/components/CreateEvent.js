import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import FileBase64 from "react-file-base64";

const CreateEvent = (props)=>{
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [img, setImg] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [info, setInfo] = useState("");
    const [interested,setInterested] = useState("");
    const [going, setGoing] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const submitHandler=((e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/events/create",
        {
            name,
            location,
            img,
            time,
            date,
            info,
            interested,
            going,
        },
        { withCredentials: true}
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/AllEvents");
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setErrors(err.response.data.errors);
        });
    });


    return (
        <div>
            
            <form onSubmit={submitHandler}>
                <div>
                    <label>Event Name:  </label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} type="text"/>
                        <br/>
                        {
                            errors.name?
                            <p>{errors.name.message}</p>
                            :null
                        }
                            <br/>
                </div>

                <div>
                    <label>Event Location:  </label>
                    <input value={location} onChange={(e)=> setLocation(e.target.value)} type="number"/>
                        <br/>
                        {
                            errors.location?
                            <p>{errors.location.message}</p>
                            :null
                        }
                            <br/>
                </div>

                <div>
                    <label>Img:  </label>
                    <input value={image} onChange={(e)=> setImg(e.target.value)} type="data"/>
                    <FileBase64
                    multiple={false}
                    onDone={({base64})=>setImg( base64)}/>
                    
                        <br/>
                        {
                            errors.img?
                            <p>{errors.img.message}</p>
                            :null
                        }
                            <br/>
                </div>
    
                <div>
                    <label>Event Time:  </label>
                    <input value={time} onChange={(e)=> setTime(e.target.value)} type="text"/>
                        <br/>
                        {
                            errors.time?
                            <p>{errors.time.message}</p>
                            :null
                        }
                            <br/>
                </div>
    
                <div>
                    <label>Event Date:  </label>
                    <input value={date} onChange={(e)=> setDate(e.target.value)} type="text"/>
                        <br/>
                        {
                            errors.date?
                            <p>{errors.date.message}</p>
                            :null
                        }
                            <br/>
                </div>
    
                <div>
                    <label>Event Info:  </label>
                    <input value={info} onChange={(e)=> setInfo(e.target.value)} type="text"/>
                        <br/>
                        {
                            errors.info?
                            <p>{errors.info.message}</p>
                            :null
                        }
                            <br/>
                </div>
    
                <div>
                    <label>Interested:  </label>
                    <input value={interested} onChange={(e)=> setInterested(e.target.value)} type="text"/>
                        <br/>
                        {
                            errors.interested?
                            <p>{errors.interested.message}</p>
                            :null
                        }
                            <br/>
                </div>
    
                <div>
                    <label>Going:  </label>
                    <input value={going} onChange={(e)=> setGoing(e.target.value)} type="text"/>
                        <br/>
                        {
                            errors.going?
                            <p>{errors.going.message}</p>
                            :null
                        }
                            <br/>
                </div>
    
                
                <button>Create Event!</button> 
            </form>
        
    
    
    
    
        </div>
    
    
    
    
    )
    
    
    }
    export default CreateEvent;








}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Container, useScrollTrigger } from "@mui/material";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import api from '../../api/axiosConfig';
import { UserContext } from "../userContext/UserContext";

export default function Header() {

    const [highlitht, sethighlight] = useState(false);
    const {loggedinUsername, setLoggedinUsername, userId, setUserId, loggedin, setLoggedin} = useContext(UserContext);
    
    const navigate = useNavigate();

    function login() {
        navigate('/Login');
    }

    function register() {
        navigate('/Register');
    }

    async function logout() {
        const data = (await api.get('/api/v1/users/logout/' + userId)).data;
        if (data.code == HttpStatusCode.Ok) {
            setLoggedinUsername(null);
            setUserId(null);
            setLoggedin(false);
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" >
            <Navbar.Brand className="ms-4" style={{"color":'gold'}}>
                <FontAwesomeIcon icon ={faVideoSlash}/>Gold
            </Navbar.Brand>
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
            </Nav>
            {
                !loggedin &&
                <div>
                    <Button variant="outline-info" className="me-2" onClick={() => login()}>Login</Button>
                    <Button variant="outline-info" className="me-4" onClick={() => register()}>Register</Button>
                </div>
            }
            {
                loggedin &&
                <>  
                    Welcome,&nbsp;&nbsp;
                    <NavLink className="nav-link me-4" to="/">{loggedinUsername}</NavLink>
                    <Button variant="outline-info" className="me-4" onClick={() => logout()}>Logout</Button>
                </>
            }
        </Navbar>
      )
}
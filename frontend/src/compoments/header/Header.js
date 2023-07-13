import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Container } from "@mui/material";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";



const Header = () => {
    
    const navigate = useNavigate();

    function login() {
        navigate('/Login');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" >
            <Navbar.Brand className="ms-4" href="/" style={{"color":'gold'}}>
                <FontAwesomeIcon icon ={faVideoSlash}/>Gold
            </Navbar.Brand>
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
                <NavLink className ="nav-link" to="/">Home</NavLink>
                <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
            </Nav>
            <Button variant="outline-info" className="me-2" onClick={() => login()}>Login</Button>
            <Button variant="outline-info" className="me-4">Register</Button>
        </Navbar>
      )
    }

export default Header
import { useState, useContext } from "react";
import  { NavLink, Navigate } from 'react-router-dom';
import "./LoginForm.css";
import api from "../../api/axiosConfig";
import { HttpStatusCode } from "axios";
import { UserContext } from "../userContext/UserContext";

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setLoggedinUsername, setUserId, loggedin, setLoggedin} = useContext(UserContext);
    const [isLogedinFailed, setIsLogedinFailed] = useState(false);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const data = (await api.post('/api/v1/users/login', {username, password})).data;
        if (data.code == HttpStatusCode.Ok) {
            setLoggedinUsername(username);
            setUserId(data.data);
            setLoggedin(true);
        } else {
            setIsLogedinFailed(true);
        }
    }

    if (!loggedin) {
        return (
            <div className="Container">
                <form className="Form" onSubmit={handleSubmit}>
                    <input value={username} 
                            onChange={ev => setUsername(ev.target.value)}
                            type="text" 
                            placeholder="username" 
                            className="block w-full rounded-lg p-2 mb-2" />
                    <input value={password} 
                            onChange={ev => setPassword(ev.target.value)}
                            type="password" 
                            placeholder="password" 
                            className="block w-full rounded-lg p-2 mb-2" />
                    <button className="bg-blue-500 text-black block w-full rounded-lg p-2 mt-4">
                            Login
                    </button>
                    <div>
                        Do not have an account?&nbsp;&nbsp;
                        <NavLink to="/Register">Register here</NavLink>
                    </div>
                    {isLogedinFailed &&
                        <p className="AuthFailedText">Incorrect username or password</p>}
                </form>
            </div>
        );
    }
    return <Navigate to='/' />
}
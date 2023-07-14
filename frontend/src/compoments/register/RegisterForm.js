import { useState, useContext } from "react";
import  { NavLink, Navigate } from 'react-router-dom';
import "./RegisterForm.css";
import api from "../../api/axiosConfig";
import { HttpStatusCode } from "axios";
import { UserContext } from "../userContext/UserContext";

export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {loggedin, setLoggedinUsername, setUserId, setLoggedin} = useContext(UserContext);
    const [isRegisteredFailed, setIsRegisteredFailed] = useState(false);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const data = (await api.post('/api/v1/users/register', {username, password, email})).data;
        console.log(data);
        if (data.code == HttpStatusCode.Ok) {
            setLoggedinUsername(username);
            setUserId(data.data);
            setLoggedin(true);
        } else {
            setIsRegisteredFailed(true);
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
                    <input value={email} 
                            onChange={ev => setEmail(ev.target.value)}
                            type="email" 
                            placeholder="email" 
                            className="block w-full rounded-lg p-2 mb-2" />
                    <button className="bg-blue-500 text-black block w-full rounded-lg p-2 mt-4">
                            Register
                    </button>
                    {isRegisteredFailed &&
                        <p className="AuthFailedText">Invalid username/password/email</p>}
                </form>
            </div>
        );
    }
    return <Navigate to='/' />
}
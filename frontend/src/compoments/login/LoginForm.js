import { useState, useContext } from "react";
import "./LoginForm.css";
import api from "../../api/axiosConfig";

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(ev) {
        ev.preventDefault();
        const data = api.post('/api/v1/users/login', {username, password});
        console.log(data);
    }

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
            </form>
        </div>

    );
}
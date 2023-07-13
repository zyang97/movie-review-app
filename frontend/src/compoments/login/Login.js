import { useState, useContext } from "react";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import Layout from "./Layout";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
    async function handleSubmit(ev) {
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        ev.preventDefault();
    }
    return (
        <Layout>
            <LoginHeader />
            <LoginForm />
        </Layout>
    );
}
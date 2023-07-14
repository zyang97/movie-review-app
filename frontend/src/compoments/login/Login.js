import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import Layout from "./Layout";

export default function Login() {
    return (
        <Layout>
            <LoginHeader />
            <LoginForm />
        </Layout>
    );
}
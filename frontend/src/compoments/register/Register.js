import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import Layout from "../login/Layout";

export default function Login() {
    return (
        <Layout>
            <RegisterHeader />
            <RegisterForm />
        </Layout>
    );
}
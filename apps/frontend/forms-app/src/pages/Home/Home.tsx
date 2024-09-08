import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { createUser } from "../../common/api.service";
import { REDIRECTION_ROUTES } from '../../common/constants';
import './Home.scss'

const Home = () => {
    const navigate = useNavigate();

    const handleSuccessLogin = async (credentialResponse: CredentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential || 'undefined');
        const { email, given_name } = decoded as { given_name: string, email: string, picture: string };
        const promise = await createUser({
            name: given_name,
            email,
            gender: 'F',
            age: '35',
        });
        const data = await promise.json()
        localStorage.setItem('user', JSON.stringify({ ...data}))
        navigate(REDIRECTION_ROUTES.FORMS);
    }

    const handleErrorLogin = () => {
        alert('failed to login')
    }

    return (
        <main className='home-container'>
            <h1>CrazyForms</h1>
            <GoogleLogin
                onSuccess={handleSuccessLogin}
                onError={handleErrorLogin}
            />
        </main>
    )
}

export default Home
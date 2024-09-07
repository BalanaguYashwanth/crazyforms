import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { createUser } from "../../common/api.service";
import { REDIRECTION_ROUTES } from '../../common/constants';

const Home = () => {
    const navigate = useNavigate();

    const handleSuccessLogin = async (credentialResponse: CredentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential || 'undefined');
        const { picture, email, given_name } = decoded as { given_name: string, email: string, picture: string };
        await createUser({
            name: given_name,
            email,
            gender: 'F',
            age: '35',
        });
        localStorage.setItem('user', JSON.stringify({ name: given_name, email, picture }))
        navigate(REDIRECTION_ROUTES.EDIT_FORM);
    }

    const handleErrorLogin = () => {
        alert('failed to login')
    }

    return (
        <main>
            <h1>Home</h1>
            <GoogleLogin
                onSuccess={handleSuccessLogin}
                onError={handleErrorLogin}
            />
        </main>
    )
}

export default Home
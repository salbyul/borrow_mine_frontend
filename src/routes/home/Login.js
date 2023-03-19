import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import LoginForm from '../../components/login/LoginForm';

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const token = cookies.SKAT;
        if (token) {
            alert('로그아웃 후 이용해주세요.');
            window.location.href = '/';
        }
    }, []);
    return (
        <>
            <div className="w-screen h-screen text-center">
                <h1 className="mb-12 text-4xl">로그인</h1>
                <LoginForm />
            </div>
        </>
    );
}
export default Login;

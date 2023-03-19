import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import JoinForm from '../../components/join/JoinForm';

function Join() {
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
                <h1 className="mb-12 text-4xl">회원가입</h1>
                <JoinForm />
            </div>
        </>
    );
}
export default Join;

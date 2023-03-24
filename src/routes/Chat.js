import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

function Chat() {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const location = useLocation();
    useEffect(() => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
    }, []);
    return (
        <>
            <div className="flex mx-auto w-7/12">
                <div className="w-4/12 bg-red-100 border">list</div>
                <div className="w-8/12 bg-lime-100 border">chat</div>
            </div>
        </>
    );
}
export default Chat;

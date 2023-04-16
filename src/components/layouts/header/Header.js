import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [nickname, setNickname] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (cookies.SKAT && cookies.nickname) {
            setNickname(cookies.nickname);
        } else {
            removeCookie('SKAT');
            removeCookie('nickname');
        }
    }, []);

    return (
        <>
            <div className="pt-5 mx-auto pr-10 pb-20 bg-gray-50">
                <div className="flex justify-end">
                    {nickname === '' ? (
                        <a
                            href={`/login?re=${location.pathname}`}
                            className="px-3 py-1.5 text-xs rounded-md duration-75 hover:duration-75 hover:bg-gray-100 text-gray-700"
                        >
                            로그인
                        </a>
                    ) : (
                        <div className="flex items-center">
                            <a href="/chat">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                            <HeaderDropdown nickname={nickname} />
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <button
                        onClick={() => (window.location.href = '/')}
                        className="w-3/12"
                    >
                        <img
                            src="/imgs/logo/borrow_mine.png"
                            alt="logo"
                            className="pt-10 mx-auto w-max"
                        />
                    </button>
                </div>
            </div>
            <hr className="mb-20" />
        </>
    );
}
export default Header;

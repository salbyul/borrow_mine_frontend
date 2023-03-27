import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [nickname, setNickname] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (cookies.SKAT) {
            axios
                .get('/header')
                .then((response) => {
                    setNickname(response.data);
                    setCookie('nickname', response.data);
                })
                .catch((error) => {
                    removeCookie('SKAT');
                    removeCookie('nickname');
                });
        }
    }, []);

    return (
        <>
            {/* TODO 헤더 화면 상단 고정? 
                메일 기능 추가해야 댐*/}
            <div className="mt-10 pt-3 mx-auto pr-10 bg-gray-50 pb-20">
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
                    <a href="/" className="text-7xl text-gray-700">
                        Borrow Mine
                    </a>
                </div>
            </div>
            <hr className="mb-20" />
        </>
    );
}
export default Header;

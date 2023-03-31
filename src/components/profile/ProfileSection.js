import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileSection({ initPath, changedPath }) {
    const [path, setPath] = useState('');
    useEffect(() => {
        setPath(initPath);
    }, []);
    useEffect(() => {
        changedPath(path);
    }, [path]);
    return (
        <>
            <div>
                <Link to="/profile">
                    <button
                        className={`my-5 py-1 w-full duration-150 text-gray-500 rounded-md text-sm hover:duration-150 hover:bg-gray-200 ${
                            path === '' && 'font-semibold text-gray-700'
                        }`}
                        onClick={() => setPath('')}
                    >
                        내 정보
                    </button>
                </Link>
                <Link to="/profile/password">
                    <button
                        className={`my-5 py-1 w-full duration-150 text-gray-500 rounded-md text-sm hover:duration-150 hover:bg-gray-200 ${
                            path === 'borrow/wrote' &&
                            'font-semibold text-gray-700'
                        }`}
                        onClick={() => setPath('password')}
                    >
                        비밀번호 변경
                    </button>
                </Link>
                <Link to="/profile/borrow/wrote">
                    <button
                        className={`my-5 py-1 w-full duration-150 text-gray-500 rounded-md text-sm hover:duration-150 hover:bg-gray-200 ${
                            path === 'borrow/wrote' &&
                            'font-semibold text-gray-700'
                        }`}
                        onClick={() => setPath('borrow/wrote')}
                    >
                        내가 쓴 글
                    </button>
                </Link>
                <Link to="/profile/request/received">
                    <button
                        className={`my-5 py-1 w-full duration-150 text-gray-500 rounded-md text-sm hover:duration-150 hover:bg-gray-200 ${
                            path === 'request/received' &&
                            'font-semibold text-gray-700'
                        }`}
                        onClick={() => setPath('request/received')}
                    >
                        받은 요청
                    </button>
                </Link>
                <Link to="/profile/request/sent">
                    <button
                        className={`my-5 py-1 w-full duration-150 text-gray-500 rounded-md text-sm hover:duration-150 hover:bg-gray-200 ${
                            path === 'request/sent' &&
                            'font-semibold text-gray-700'
                        }`}
                        onClick={() => setPath('request/sent')}
                    >
                        보낸 요청
                    </button>
                </Link>
                <Link to="/profile/deny/list">
                    <button
                        className={`my-5 py-1 w-full duration-150 text-gray-500 rounded-md text-sm hover:duration-150 hover:bg-gray-200 ${
                            path === 'deny/list' &&
                            'font-semibold text-gray-700'
                        }`}
                        onClick={() => setPath('deny/list')}
                    >
                        차단 목록
                    </button>
                </Link>
            </div>
        </>
    );
}
export default ProfileSection;

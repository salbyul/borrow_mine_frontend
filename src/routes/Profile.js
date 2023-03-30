import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import ProfileBorrowWrote from '../components/profile/ProfileBorrowWrote';
import ProfileDenyList from '../components/profile/ProfileDenyList';
import ProfileHome from '../components/profile/ProfileHome';
import ProfileReceivedRequest from '../components/profile/ProfileReceivedRequest';
import ProfileSection from '../components/profile/ProfileSection';
import ProfileSentRequest from '../components/profile/ProfileSentRequest';

function Profile() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [path, setPath] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        setPath(location.pathname.substring(9));
    }, []);
    useEffect(() => {
        console.log(path);
    }, [path]);
    const changedPath = (path) => {
        setPath(path);
    };
    return (
        <>
            <div className="flex w-7/12 mx-auto justify-center border">
                <div className="border-r w-3/12 text-center">
                    <ProfileSection changedPath={changedPath} />
                </div>
                <div className="w-9/12 text-center">
                    {path === '' && <ProfileHome />}
                    {path === 'borrow/wrote' && <ProfileBorrowWrote />}
                    {path === 'request/received' && <ProfileReceivedRequest />}
                    {path === 'request/sent' && <ProfileSentRequest />}
                    {path === 'deny/list' && <ProfileDenyList />}
                </div>
            </div>
        </>
    );
}
export default Profile;

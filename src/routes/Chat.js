import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useSearchParams } from 'react-router-dom';
import ChattingList from '../components/chat/ChattingList';
import ChattingRoom from '../components/chat/ChattingRoom';

function Chat() {
    const [target, setTarget] = useState('');
    const [targetList, setTargetList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const targetChange = (target) => {
        setTarget(target);
    };

    useEffect(() => {
        if (targetList.length !== 0) {
            setLoading(true);
        }
    }, [targetList]);
    useEffect(() => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }

        axios
            .get('/chat/chat-room')
            .then((response) => {
                const chatRooms = response.data.chatRoomList;
                const list = [...chatRooms];
                const preTarget = searchParams.get('target');
                if (preTarget !== null) {
                    let flag = false;
                    for (let i = 0; i < chatRooms.length; i++) {
                        const room = chatRooms.at(i);
                        console.log(room);
                        if (room === preTarget) {
                            flag = true;
                            break;
                        }
                    }
                    console.log('hihi');
                    console.log('flag: ' + flag);
                    if (flag) {
                        setTarget(preTarget);
                    } else {
                        axios
                            .put(`/chat/chat-room/create?to=${preTarget}`)
                            .then((response) => {
                                console.log(response);
                                setTarget(preTarget);
                                list.push(preTarget);
                                setTargetList(list);
                            })
                            .catch((error) => {
                                console.log(error);
                                setTargetList(list);
                            });
                    }
                } else {
                    setTargetList(list);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div className="flex mx-auto w-7/12 h-screen justify-center">
                <div className="w-2/12 border h-3/6">
                    {loading && (
                        <ChattingList
                            list={targetList}
                            target={target}
                            targetChange={targetChange}
                        />
                    )}
                </div>
                <div className="w-7/12 border h-3/6">
                    {loading && <ChattingRoom target={target} />}
                </div>
            </div>
        </>
    );
}
export default Chat;

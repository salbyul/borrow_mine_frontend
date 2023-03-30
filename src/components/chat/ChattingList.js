import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ChattingList({ list, target, targetChange }) {
    const [targetList, setTargetList] = useState([]);
    useEffect(() => {
        const tmp = [...list];
        setTargetList(tmp);
    }, []);

    const removeTarget = (id) => {
        console.log(id);
        if (window.confirm('채팅방을 나가시겠습니까?')) {
            axios
                .delete(`/chat/chat-room/delete/${targetList.at(id)}`)
                .then((response) => {
                    console.log(response);
                    if (target === targetList.at(id)) {
                        window.location.href = '/chat';
                    }
                    const list = [...targetList];
                    list.splice(id, 1);
                    setTargetList(list);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <div>
                {targetList.length > 0 &&
                    targetList.map((content, idx) => {
                        return (
                            <div key={idx} className="text-center flex">
                                <div
                                    className={`text-sm py-1 border-b text-gray-700 bg-gray-100 w-full duration-150 hover:cursor-pointer hover:duration-150 hover:bg-gray-200 ${
                                        target === content && 'bg-gray-300'
                                    }`}
                                    onClick={(e) =>
                                        targetChange(e.target.innerText)
                                    }
                                >
                                    {content}
                                </div>
                                <button
                                    className={`text-red-400 px-1 text-sm border-b bg-gray-100 duration-300 hover:duration-300 hover:bg-red-200 ${
                                        target === content && 'bg-gray-300'
                                    }`}
                                    onClick={() => removeTarget(idx)}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
export default ChattingList;

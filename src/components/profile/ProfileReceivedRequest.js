import axios from 'axios';
import { useEffect, useState } from 'react';
import NicknameDropdown from './dropdown/NicknameDropdown';
import RequestStateDropdown from './dropdown/RequestStateDropdown';

function ProfileReceivedRequest() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios
            .get('/borrow/request/received')
            .then((response) => {
                setList(response.data.requestDtoList);
            })
            .catch((error) => {});
    }, []);

    return (
        <>
            <div>
                <table className="w-11/12 mx-auto mt-5 text-sm">
                    <thead>
                        <tr>
                            <th className="font-normal">제품</th>
                            <th className="font-normal">가격(원)</th>
                            <th className="font-normal">기간</th>
                            <th className="font-normal">요청 날짜</th>
                            <th className="font-normal">보낸 사람</th>
                            <th className="font-normal">상태</th>
                            <th className="font-normal">게시물로 가기</th>
                        </tr>
                    </thead>
                    <tbody className="font-light text-xs">
                        {list.map((c, idx) => {
                            return (
                                <tr
                                    key={idx}
                                    className="border rounded-md text-gray-700"
                                >
                                    <td className="py-1">{c.product}</td>
                                    <td>{c.price}</td>
                                    <td>{`${c.period.startDate} ~ ${c.period.endDate}`}</td>
                                    <td>{c.createdDate.substring(0, 10)}</td>
                                    <td className="font-semibold">
                                        <NicknameDropdown
                                            nickname={c.nickname}
                                        />
                                    </td>
                                    <td
                                        className={`inline-flex w-full justify-center font-normal gap-x-1.5 rounded-md text-sm text-gray-700 ${
                                            c.state === 'ACCEPT' &&
                                            'text-green-700'
                                        } ${
                                            c.state === 'REFUSE' &&
                                            'text-red-700'
                                        }`}
                                    >
                                        {c.state === 'WAIT' ? (
                                            <RequestStateDropdown
                                                state={c.state}
                                                id={c.requestId}
                                            />
                                        ) : (
                                            <span className="hover:cursor-default">
                                                {c.state === 'ACCEPT' && '수락'}
                                                {c.state === 'REFUSE' && '거절'}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="px-3 bg-gray-100 rounded-md"
                                            onClick={() =>
                                                (window.location.href = `/borrow/detail/${c.borrowPostId}`)
                                            }
                                        >
                                            Click
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ProfileReceivedRequest;

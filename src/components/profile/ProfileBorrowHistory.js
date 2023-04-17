import axios from 'axios';
import NicknameDropdown from './dropdown/NicknameDropdown';
import { useEffect, useState } from 'react';

function ProfileBorrowHistory() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios
            .get('/borrow/request/accept')
            .then((response) => {
                setList(response.data.requestAcceptDtoList);
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
                            <th className="font-normal">닉네임</th>
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
                                    <td className="font-semibold">
                                        <NicknameDropdown
                                            nickname={c.memberNickname}
                                        />
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
export default ProfileBorrowHistory;

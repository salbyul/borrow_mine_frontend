import axios from 'axios';
import BorrowComponent from '../borrow/BorrowComponent';
import { useEffect, useState } from 'react';

function ProfileBorrowWrote() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios
            .get('/borrow/wrote')
            .then((response) => {
                setList(response.data.borrowPosts);
            })
            .catch((error) => {});
    }, []);
    return (
        <>
            <div className="mt-5">
                <h1 className="text-xl mb-7 text-gray-700">내가 쓴 글</h1>
                <div className="flex flex-col items-center">
                    {list.map((c, idx) => {
                        return <BorrowComponent key={idx} post={c} />;
                    })}
                </div>
            </div>
        </>
    );
}
export default ProfileBorrowWrote;

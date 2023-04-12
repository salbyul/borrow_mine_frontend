import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import BorrowList from '../../components/borrow/BorrowList';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

function Borrow() {
    const [postList, setPostList] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        axios
            .get(`/borrow/list?offset=${offset}`)
            .then((response) => {
                if (response.data.borrowPosts.length === 0) {
                    alert('마지막 페이지입니다.');
                    return;
                }
                const newList = response.data.borrowPosts;
                setPostList(postList.concat(newList));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [offset]);

    const postLoad = () => {
        setOffset(offset + 5);
    };

    return (
        <>
            <div className="text-center">
                <BorrowList postList={postList} />
                <button
                    className="my-10 bg-gray-50 px-3 py-1.5 rounded-xl text-gray-500 duration-300 hover:duration-300 hover:bg-gray-100"
                    onClick={() => postLoad()}
                >
                    불러오기
                </button>
                <div className="text-end">
                    <button
                        className="fixed bottom-10 right-20 border rounded-full w-10 bg-gray-50"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        <FontAwesomeIcon icon={faCaretUp} />
                    </button>
                </div>
            </div>
        </>
    );
}
export default Borrow;

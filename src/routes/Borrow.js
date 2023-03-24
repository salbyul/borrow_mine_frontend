import axios from 'axios';
import { useEffect, useState } from 'react';
import BorrowList from '../components/borrow/BorrowList';

function Borrow() {
    const [postList, setPostList] = useState([]);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        axios
            .get('/borrow/list')
            .then((response) => {
                console.log(response);
                setPostList(response.data.borrowPosts);
                setOffset(response.data.offset);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div className="text-center">
                <BorrowList postList={postList} offset={offset} />
            </div>
        </>
    );
}
export default Borrow;

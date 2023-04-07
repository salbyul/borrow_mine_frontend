import axios from 'axios';
import { useEffect, useState } from 'react';
import BorrowComponent from './BorrowComponent';

function SmallBorrowList() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios
            .get('/borrow/small_list')
            .then((response) => {
                setPostList(response.data.borrowPosts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (postList !== {}) {
            setLoading(true);
        }
    }, [postList]);
    return (
        <>
            <div className="flex flex-col items-center">
                {loading &&
                    postList.map((p) => {
                        return <BorrowComponent key={p.id} post={p} />;
                    })}
            </div>
        </>
    );
}
export default SmallBorrowList;

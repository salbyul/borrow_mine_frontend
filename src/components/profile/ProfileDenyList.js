import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function ProfileDenyList() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios
            .get('/member/deny/list')
            .then((response) => {
                const list = response.data.denyDtoList;
                setList(list);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onRemoveClick = (id) => {
        axios
            .delete(`/member/deny/delete/${id}`)
            .then((response) => {
                console.log(response);
                alert('차단이 해제되었습니다.');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="mt-5">
                <h1 className="text-xl mb-7 text-gray-700">차단 목록</h1>
                {list.map((d, idx) => {
                    return (
                        <div className="flex justify-center py-1" key={idx}>
                            <span className="text-sm text-gray-700 w-2/12 px-3 mr-2 hover:cursor-default">
                                {d.deny}
                            </span>
                            <button
                                className="text-sm px-1 text-red-400"
                                onClick={() => onRemoveClick(d.id)}
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
export default ProfileDenyList;

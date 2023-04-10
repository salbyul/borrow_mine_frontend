import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentDropdown from './CommentDropdown';

function CommentForm({ comments, token }) {
    const [text, setText] = useState('');
    const location = useLocation();

    const onTextChange = (e) => {
        setText(e.target.value);
    };

    const onSubmitClick = () => {
        if (!token) {
            alert('로그인 후 이용해주세요.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        if (text === '') {
            alert('내용을 입력해주세요.');
            return;
        }
        const comment = {
            borrowPostId: location.pathname.substring(8),
            content: text,
        };
        axios
            .put('/comment/save', comment)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {});
    };

    const onReportClick = (e) => {
        if (!token) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        axios
            .put(`/comment/report/${e.target.id}`)
            .then((response) => {
                alert('신고가 완료되었습니다.');
            })
            .catch((error) => {
                console.log(error);
                const code = error.response.data.code;
                if (code === 111) {
                    alert('신고는 한번만 가능합니다.');
                } else if (code === 222) {
                    alert('자신의 댓글에 신고를 할 수 없습니다.');
                }
            });
    };
    return (
        <>
            <div>
                {comments.map((c) => {
                    return (
                        <div key={c.id} className="flex py-10 border-b">
                            <div className="w-2/12 text-xs text-gray-700">
                                <CommentDropdown nickname={c.nickname} />
                            </div>
                            <div className="w-7/12 text-sm text-gray-800">
                                {c.content}
                            </div>
                            <div className="w-3/12 flex justify-between items-center">
                                <div className="text-gray-300 text-xs">
                                    {c.createdDate.substring(0, 10)}
                                </div>
                                <button
                                    className="text-sm text-gray-300"
                                    type="button"
                                    onClick={onReportClick}
                                    id={c.id}
                                >
                                    Report
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex mt-5" id="form">
                <textarea
                    rows="5"
                    className="border w-full pl-1 resize-none rounded-l-md text-gray-700"
                    placeholder="내용을 입력해주세요."
                    value={text}
                    onChange={onTextChange}
                ></textarea>
                <button
                    className="px-10 py-10 bg-violet-300 rounded-r-md text-white duration-150 hover:duration-150 hover:bg-violet-400"
                    type="button"
                    onClick={onSubmitClick}
                >
                    Submit
                </button>
            </div>
        </>
    );
}
export default CommentForm;

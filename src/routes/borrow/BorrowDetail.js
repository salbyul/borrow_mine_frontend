import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import CommentForm from '../../components/comment/CommentForm';
import { useCookies } from 'react-cookie';
import BorrowDropdown from '../../components/borrow/BorrowDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';

function BorrowDetail() {
    const [detail, setDetail] = useState({});
    const [isBookmark, setIsBookmark] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['']);
    const location = useLocation();

    useEffect(() => {
        if (detail.state) {
            setLoading(true);
        }
    }, [detail]);

    useEffect(() => {
        setId(location.pathname.substring(15));
        axios
            .get(`/borrow/${location.pathname.substring(15)}`)
            .then((response) => {
                console.log(response);
                setDetail(response.data.borrowDetail);
                setIsBookmark(response.data.isBookmark);
                if (cookies.SKAT) {
                    setToken(cookies.SKAT);
                }
            })
            .catch((error) => {
                alert('잘못된 접근입니다.');
                window.location.href = '/';
            });
    }, []);
    const onReportClick = () => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        axios
            .put(`/borrow/report/${location.pathname.substring(15)}`)
            .then((response) => {
                alert('신고가 완료되었습니다.');
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 201) {
                    alert('신고는 한번만 가능합니다.');
                } else if (code === 101) {
                    alert('자신의 게시물에 신고를 할 수 없습니다.');
                }
            });
    };

    const onRequestClick = () => {
        if (!cookies.SKAT || !cookies.nickname) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
        }
        const id = location.pathname.substring(15);
        axios
            .put(`/borrow/request?id=${id}`)
            .then((response) => {
                alert('요청이 완료되었습니다.');
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 301) {
                    alert('이미 요청이 되었습니다.');
                }
            });
    };

    const ondeleteClick = () => {
        if (window.confirm('진짜 삭제하시겠습니까?')) {
            axios
                .delete(`/borrow/delete/${id}`)
                .then((response) => {
                    alert('삭제가 완료되었습니다.');
                    window.location.href = '/borrow/';
                })
                .catch((error) => {});
        }
    };

    const bookmark = () => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        axios
            .post(
                `/borrow/bookmark?borrow_post_id=${location.pathname.substring(
                    15
                )}`
            )
            .then((response) => {
                console.log(response);
                setIsBookmark(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteBookmark = () => {
        axios
            .delete(
                `/borrow/bookmark?borrow_post_id=${location.pathname.substring(
                    15
                )}`
            )
            .then((response) => {
                console.log(response);
                setIsBookmark(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {loading && (
                <div className="text-center max-w-screen-md mx-auto">
                    {/* title */}
                    <div className="flex justify-between">
                        <div>
                            <span className="text-2xl text-gray-700">
                                {isBookmark ? (
                                    <button
                                        className="mr-4 text-yellow-200"
                                        onClick={() => deleteBookmark()}
                                    >
                                        <FontAwesomeIcon icon={faStarFull} />
                                    </button>
                                ) : (
                                    <button
                                        className="mr-4"
                                        onClick={() => bookmark()}
                                    >
                                        <FontAwesomeIcon icon={faStar} />
                                    </button>
                                )}
                                {detail.title}
                            </span>
                        </div>
                        <div>
                            {detail.nickname !== cookies.nickname ? (
                                detail.state === 'ACTIVATE' && (
                                    <span>
                                        <button
                                            className="bg-gray-400 text-white px-3 py-1.5 rounded-md mx-3 text-xs duration-150 hover:duration-150 hover:bg-gray-500"
                                            onClick={onRequestClick}
                                        >
                                            요청
                                        </button>
                                    </span>
                                )
                            ) : (
                                <span>
                                    <button
                                        className="bg-red-400 text-white px-3 py-1.5 rounded-md mx-3 text-xs duration-150 hover:duration-150 hover:bg-red-500"
                                        onClick={() => ondeleteClick()}
                                    >
                                        삭제
                                    </button>
                                </span>
                            )}
                            <span className="text-xs text-gray-300 mr-3">
                                {detail.createdDate.substring(0, 10)}
                            </span>
                            <span
                                className={`text-sm mr-3 ${
                                    detail.state === 'ACTIVATE'
                                        ? 'text-green-500 '
                                        : 'text-red-500'
                                }`}
                            >
                                {detail.state}
                            </span>

                            <button
                                className="text-xs text-gray-400 duration-150 hover:duration-150 hover:text-gray-500"
                                type="button"
                                onClick={onReportClick}
                            >
                                Report
                            </button>
                        </div>
                    </div>
                    <hr className="my-5" />
                    {/* content */}
                    <div>
                        <div className="text-start">
                            <BorrowDropdown nickname={detail.nickname} />
                        </div>
                        <div className="mx-auto h-fit">
                            <Carousel
                                showThumbs={false}
                                showStatus={false}
                                showArrows={true}
                                infiniteLoop={true}
                            >
                                {detail.imageDtoList.map((i) => {
                                    return (
                                        <div
                                            key={i.imageName}
                                            className="relative w-full h-0 pb-96"
                                        >
                                            <img
                                                src={`data:image/jpeg;base64,${i.image}`}
                                                alt={i.imageName}
                                                className="absolute top-0 left-0 w-full h-full"
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </div>
                        <div className="text-start">
                            <div className="mt-10 mb-20">{detail.content}</div>
                            <div>
                                <div>가격: {detail.price}</div>
                                <div>주소: {detail.address.street}</div>
                                <div>
                                    기간:{' '}
                                    {detail.period.startDate.substring(0, 10)} ~{' '}
                                    {detail.period.endDate.substring(0, 10)}
                                </div>
                                <div>상품명: {detail.product}</div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-5" />
                    {/* comment */}
                    <div className="pb-10">
                        <CommentForm
                            comments={detail.commentDtoList}
                            token={token}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
export default BorrowDetail;

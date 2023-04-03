import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import CommentForm from '../../components/comment/CommentForm';
import { useCookies } from 'react-cookie';
import BorrowDropdown from '../../components/borrow/BorrowDropdown';

function BorrowDetail() {
    const [detail, setDetail] = useState({});
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
        axios
            .get(`/borrow/${location.pathname.substring(8)}`)
            .then((response) => {
                setDetail(response.data.borrowDetail);
                if (cookies.SKAT) {
                    setToken(cookies.SKAT);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const onReportClick = () => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        axios
            .put(`/borrow/report/${location.pathname.substring(8)}`)
            .then((response) => {
                alert('신고가 완료되었습니다.');
            })
            .catch((error) => {
                if (error.response.data.code === 111) {
                    alert('신고는 한번만 가능합니다.');
                }
            });
    };

    const onRequestClick = () => {
        const id = location.pathname.substring(8);
        axios
            .put(`/borrow/request/${id}`)
            .then((response) => {
                alert('요청이 완료되었습니다.');
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 111) {
                    alert('이미 요청이 되었습니다.');
                }
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
                                {detail.title}
                            </span>
                        </div>
                        <div>
                            {detail.state === 'ACTIVATE' && (
                                <button
                                    className="bg-gray-500 text-white px-3 py-1.5 rounded-md mx-3 text-xs duration-150 hover:duration-150 hover:bg-gray-600"
                                    onClick={onRequestClick}
                                >
                                    요청
                                </button>
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

import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import CommentForm from '../../components/comment/CommentForm';
import { useCookies } from 'react-cookie';

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
                console.log(response.data.borrowDetail);
                if (cookies.SKAT) {
                    setToken(cookies.SKAT);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
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
                                <button className="bg-gray-500 text-white px-3 py-1.5 rounded-md mx-3 text-xs duration-150 hover:duration-150 hover:bg-gray-600">
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

                            <button className="text-xs text-gray-400 duration-150 hover:duration-150 hover:text-gray-500">
                                Report
                            </button>
                        </div>
                    </div>
                    <hr className="my-5" />
                    {/* content */}
                    <div>
                        <div className="text-start">
                            <button className="text-sm text-gray-700">
                                {detail.nickname}
                            </button>
                        </div>
                        <div className="mx-auto max-w-xl">
                            <Carousel
                                showThumbs={false}
                                showStatus={false}
                                showArrows={true}
                                infiniteLoop={true}
                            >
                                {detail.imageDtoList.map((i) => {
                                    return (
                                        <div key={i.imageName}>
                                            <img
                                                src={`data:image/jpeg;base64,${i.image}`}
                                                alt={i.imageName}
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

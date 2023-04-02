import axios from 'axios';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import BorrowValidator from '../../components/borrow/BorrowValidator';

function BorrowCreate() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [product, setProduct] = useState('');
    const [imageSrcList, setImageSrcList] = useState([]);
    const [imageList, setImageList] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content, setContent] = useState('');
    const [recommend, setRecommend] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const onProductChange = (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            axios
                .get(`/borrow/product/${value}`)
                .then((response) => {
                    setRecommend(response.data.productNames);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setProduct(value);
    };
    const onImageChange = (e) => {
        if (imageSrcList.length === 3) {
            alert('이미지는 3개까지 추가가 가능합니다.');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            const list = [...imageSrcList];
            list.push(reader.result);
            setImageSrcList(list);
        };
        const list = [...imageList];
        list.push(e.target.files[0]);
        setImageList(list);
    };

    const onImageClick = (e) => {
        const list = [...imageList];
        list.splice(e, 1);
        setImageList(list);
        const srcList = [...imageSrcList];
        srcList.splice(e, 1);
        setImageSrcList(srcList);
    };

    const onSubmitClick = () => {
        const validator = new BorrowValidator();
        if (!validator.validateTitle(title)) return;
        if (!validator.validatePrice(price)) return;
        if (!validator.validateProduct(product)) return;
        if (!validator.validateStartDate(startDate)) return;
        if (!validator.validateEndDate(startDate, endDate)) return;
        if (!validator.validateContent(content)) return;

        const data = new FormData();

        const post = {
            title: title,
            price: price,
            product: product,
            startDate: startDate,
            endDate: endDate,
            content: content,
        };
        const postJson = JSON.stringify(post);
        const blob = new Blob([postJson], { type: 'application/json' });
        data.append('borrowPostSaveDto', blob);

        imageList.forEach((image) => {
            data.append('imageList', image);
        });

        axios
            .put('/borrow/create', data)
            .then((response) => {
                window.location.href = `/borrow/${response.data.id}`;
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="w-6/12 mx-auto border shadow-md">
                <div className="border-b">
                    <input
                        type="text"
                        className="w-full py-1 pl-1 text-md text-gray-700"
                        placeholder="제목을 입력하세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="border-y my-3 flex">
                    <div className="w-3/12">
                        <input
                            type="text"
                            id="price"
                            className="text-gray-700 text-sm pl-1"
                            placeholder="가격"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label
                            htmlFor="price"
                            className="border-r text-gray-700 text-sm pr-1"
                        >
                            원
                        </label>
                    </div>
                    <div className="w-5/12 border-r">
                        <div>
                            <input
                                type="text"
                                className="text-gray-700 text-sm pl-1 w-full"
                                placeholder="제품명"
                                value={product}
                                onChange={onProductChange}
                                onFocus={() => setIsFocus(true)}
                                onBlur={(e) => {
                                    if (
                                        e.relatedTarget &&
                                        e.relatedTarget.id === 'recommend'
                                    ) {
                                        setProduct(e.relatedTarget.value);
                                        setIsFocus(false);
                                        return;
                                    }
                                    setIsFocus(false);
                                }}
                            />
                        </div>
                        {isFocus && recommend.length > 0 && (
                            <div className="absolute shadow-lg w-2/12 rounded-md bg-gray-100">
                                {recommend.map((word) => (
                                    <button
                                        id="recommend"
                                        key={word}
                                        className="pl-1 w-full text-start border-b text-gray-700 text-sm duration-150 hover:duration-150 hover:bg-gray-200"
                                        value={word}
                                    >
                                        {word}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mx-auto w-4/12 text-center">
                        <label
                            htmlFor="image"
                            className="text-gray-700 hover:cursor-pointer"
                        >
                            이미지 추가
                        </label>
                        <input
                            type="file"
                            id="image"
                            hidden
                            accept="image/*"
                            onChange={onImageChange}
                        />
                    </div>
                </div>
                <div className="border-y flex">
                    <div className="w-1/2 border-r pl-1 flex">
                        <div>
                            <label
                                htmlFor="startDate"
                                className="text-gray-700 text-sm mr-4 border-r"
                            >
                                시작 날짜:{' '}
                            </label>
                        </div>
                        <input
                            type="date"
                            id="startDate"
                            className="text-gray-700 text-sm mx-auto"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2 pl-1 flex">
                        <div>
                            <label
                                htmlFor="endDate"
                                className="text-gray-700 text-sm mr-4 border-r"
                            >
                                종료 날짜:{' '}
                            </label>
                        </div>
                        <input
                            type="date"
                            id="endDate"
                            className="text-gray-700 text-sm mx-auto"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="py-1 border-b">
                    {imageList.length > 0 && (
                        <div className="max-w-sm mx-auto text-center max-h-sm">
                            <Carousel
                                showThumbs={false}
                                showStatus={false}
                                showArrows={true}
                                infiniteLoop={true}
                                showIndicators={false}
                                onClickItem={onImageClick}
                            >
                                {imageSrcList.map((i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="relative w-full h-0 pb-96"
                                        >
                                            <img
                                                src={i}
                                                alt={i}
                                                className="absolute top-0 left-0 w-full h-full"
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel>
                            <span className="text-gray-300">클릭으로 제거</span>
                        </div>
                    )}
                    <textarea
                        cols="30"
                        rows="10"
                        className="resize-none w-full h-full pl-1 text-gray-700"
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="w-full text-center my-3">
                    <button
                        className="bg-violet-300 px-3 py-1.5 rounded-md text-white"
                        type="button"
                        onClick={onSubmitClick}
                    >
                        글쓰기
                    </button>
                </div>
            </div>
        </>
    );
}
export default BorrowCreate;

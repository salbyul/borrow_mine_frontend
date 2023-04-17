import axios from 'axios';
import { useEffect, useState } from 'react';

function PopularProduct() {
    const [sortBy, setSortBy] = useState('until-now');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(true);
        }
    }, [data]);

    useEffect(() => {
        axios
            .get(`/borrow/popular/${sortBy}`)
            .then((response) => {
                setData(response.data.productList);
            })
            .catch((error) => {});
    }, [sortBy]);
    return (
        <>
            <div>
                <div className="flex justify-evenly">
                    <button
                        className="px-3 py-1.5 text-white text-xs bg-gray-400 rounded-md duration-150 hover:duration-150 hover:bg-gray-500"
                        onClick={() => setSortBy('week')}
                    >
                        주간
                    </button>
                    <button
                        className="px-3 py-1.5 text-white text-xs bg-gray-400 rounded-md duration-150 hover:duration-150 hover:bg-gray-500"
                        onClick={() => setSortBy('month')}
                    >
                        월간
                    </button>
                    <button
                        className="px-3 py-1.5 text-white text-xs bg-gray-400 rounded-md duration-150 hover:duration-150 hover:bg-gray-500"
                        onClick={() => setSortBy('until-now')}
                    >
                        역대
                    </button>
                </div>
                <div className="mt-5 flex justify-evenly">
                    <div className="w-1/12 text-center text-gray-600">순위</div>
                    <div className="w-5/12 text-center text-gray-800">
                        제품명
                    </div>
                    <div className="w-3/12 text-cetner text-gray-600">횟수</div>
                </div>
                {isLoading &&
                    data.map((p) => {
                        return (
                            <div
                                className="mt-5 flex justify-evenly"
                                key={p.name}
                            >
                                <div className="w-1/12 text-center text-gray-600">
                                    {data.indexOf(p) + 1}.
                                </div>
                                <div className="w-5/12 text-center text-gray-800">
                                    {p.name}
                                </div>
                                <div className="w-3/12 text-cetner text-gray-600">
                                    {p.number}번
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
export default PopularProduct;

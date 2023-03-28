import { useEffect, useState } from 'react';

function ChattingList({ list, target, targetChange }) {
    const [targetList, setTargetList] = useState([]);
    useEffect(() => {
        const tmp = [...list];
        setTargetList(tmp);
    }, []);
    return (
        <>
            <div>
                {targetList.length > 0 &&
                    targetList.map((content, idx) => {
                        return (
                            <div key={idx} className="text-center">
                                <button
                                    className={`text-sm py-1 border-b text-gray-700 bg-gray-100 w-full duration-150 hover:duration-150 hover:bg-gray-200 ${
                                        target === content && 'bg-gray-300'
                                    }`}
                                    onClick={(e) =>
                                        targetChange(e.target.innerText)
                                    }
                                >
                                    {content}
                                </button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
export default ChattingList;

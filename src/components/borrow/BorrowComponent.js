function BorrowComponent({ post }) {
    return (
        <>
            <div className="w-2/12 mb-12 duration-300 hover:w-3/12 hover:duration-300">
                <a href={`/borrow/detail/${post.id}`}>
                    {post.imageDtoList[0] && (
                        <img
                            src={`data:image/jpeg;base64,${post.imageDtoList[0].image}`}
                            alt={post.imageDtoList[0].imageName}
                            className="mx-auto"
                        />
                    )}
                    <div className="text-base my-1 text-gray-700 font-bold">
                        {post.title}
                    </div>
                    <div className="text-sm text-gray-700">{post.nickname}</div>
                    <div className="text-md text-gray-300">
                        {post.createdDate.substring(0, 10)}
                    </div>
                </a>
            </div>
        </>
    );
}
export default BorrowComponent;

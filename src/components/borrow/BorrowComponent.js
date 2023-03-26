function BorrowComponent({ post }) {
    return (
        <>
            <div className="w-2/12 mb-12 duration-150 hover:w-3/12 hover:duration-150">
                <a href={`/borrow/${post.id}`}>
                    <img
                        src={`data:image/jpeg;base64,${post.imageDtoList[0].image}`}
                        alt={post.imageDtoList[0].imageName}
                        className="mx-auto"
                    />
                    <div className="text-xl my-1 text-gray-700">
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

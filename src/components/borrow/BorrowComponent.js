function BorrowComponent({ post }) {
    return (
        <>
            <div className="w-3/12 mb-12 duration-150 hover:w-4/12 hover:duration-150">
                <a href={`/borrow/${post.id}`}>
                    <img
                        src={`data:image/jpeg;base64,${post.imageDtoList[0].image}`}
                        alt={post.imageDtoList[0].imageName}
                        className="mx-auto"
                    />
                    <div className="text-xl my-1">{post.title}</div>
                    <div className="text-lg">{post.nickname}</div>
                    <div className="text-md">
                        {post.createdDate.substring(0, 10)}
                    </div>
                </a>
            </div>
        </>
    );
}
export default BorrowComponent;

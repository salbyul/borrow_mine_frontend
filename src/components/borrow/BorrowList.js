import BorrowComponent from './BorrowComponent';

function BorrowList({ postList }) {
    return (
        <>
            <div className="flex flex-col items-center">
                {postList.map((p) => {
                    return <BorrowComponent key={p.id} post={p} />;
                })}
            </div>
        </>
    );
}
export default BorrowList;

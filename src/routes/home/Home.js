import SmallBorrowList from '../../components/borrow/SmallBorrowList';

function Home() {
    return (
        <>
            <div className="text-center">
                <div>
                    <a href="/borrow" className="text-3xl">
                        Borrow
                    </a>
                    <hr className="my-5" />
                    <SmallBorrowList />
                </div>
            </div>
        </>
    );
}
export default Home;

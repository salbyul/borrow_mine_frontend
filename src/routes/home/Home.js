import SmallBorrowList from '../../components/borrow/SmallBorrowList';
import PopularProduct from '../../components/home/PopularProduct';

function Home() {
    return (
        <>
            {/* TODO 레이아웃 완전히 바꿔야 함 Borrow 하나만 넣지 말고 한 구석에 넣고 다른 걸 더 넣어야 함 */}
            <div className="flex justify-evenly">
                <div className="text-center w-3/12">
                    <h1 className="text-3xl">Popular Product</h1>
                    <hr className="my-5" />
                    <PopularProduct />
                </div>
                <div className="text-center w-5/12">
                    <a href="/borrow" className="text-3xl">
                        Borrow
                    </a>
                    <hr className="my-5" />
                    <SmallBorrowList />
                </div>
                {/* <div>
                    <a href="/borrow" className="text-3xl">
                        Borrow
                    </a>
                    <hr className="my-5" />
                    <SmallBorrowList />
                </div> */}
            </div>
        </>
    );
}
export default Home;

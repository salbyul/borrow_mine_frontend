import SmallBorrowList from '../../components/borrow/SmallBorrowList';
import PopularProduct from '../../components/home/PopularProduct';

function Home() {
    return (
        <>
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
            </div>
        </>
    );
}
export default Home;

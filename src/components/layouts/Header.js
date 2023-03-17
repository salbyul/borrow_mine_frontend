function Header() {
    return (
        <>
            {/* TODO 헤더 화면 상단 고정? */}
            <div className="mt-10 pt-3 mx-auto pr-10 bg-gray-50 pb-20">
                <div className="flex justify-end">
                    <a
                        href="/login"
                        className="px-3 py-1.5 text-sm rounded-md duration-75 hover:duration-75 hover:bg-gray-100 text-gray-700"
                    >
                        Login
                    </a>
                </div>
                <div className="text-center">
                    <a href="/" className="text-7xl text-gray-700">
                        Borrow Mine
                    </a>
                </div>
            </div>
            <hr className="mb-20" />
        </>
    );
}
export default Header;

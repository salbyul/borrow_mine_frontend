function Header() {
    return (
        <>
            {/* TODO 헤더 화면 상단 고정? */}
            <div className="mt-10 pt-3 mx-auto pr-10 bg-gray-50 pb-20">
                <div className="flex justify-end">
                    <a
                        href="/login"
                        className="bg-blue-200 px-3 py-1.5 rounded-lg"
                    >
                        Login
                    </a>
                </div>
                <div className="text-center">
                    <a href="/" className="text-7xl">
                        Borrow Mine
                    </a>
                </div>
            </div>
            <hr className="mb-20" />
        </>
    );
}
export default Header;

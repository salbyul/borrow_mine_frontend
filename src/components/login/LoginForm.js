function LoginForm() {
    return (
        <>
            <div className="border mx-auto w-2/12 py-3">
                <div className="my-3 flex mx-auto justify-center">
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            className="px-2 border rounded-sm mb-3 w-10/12 h-5 block text-xs placeholder:text-xs"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="px-2 border rounded-sm w-10/12 h-5 block text-xs placeholder:text-xs"
                        />
                    </div>
                    <button
                        type="button"
                        className="text-xs border w-3/12 bg-gray-50 rounded-sm duration-150 hover:duration-150 hover:bg-gray-100"
                    >
                        로그인
                    </button>
                </div>
                <div className="flex justify-evenly">
                    <a
                        href="/join"
                        className="text-gray-500 text-xs hover:text-gray-600"
                    >
                        가입하기
                    </a>
                    <a
                        href="/"
                        className="text-gray-500 text-xs hover:text-gray-600"
                    >
                        비밀번호 찾기
                    </a>
                </div>
            </div>
        </>
    );
}
export default LoginForm;

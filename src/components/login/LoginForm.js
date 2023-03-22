import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onLoginClick = () => {
        if (email === '' || password === '') {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        const member = {
            email: email,
            password: password,
        };
        axios
            .post('http://localhost:8080/member/login', member)
            .then((response) => {
                setCookie('SKAT', response.data.token);
                if (searchParams.get('re')) {
                    window.location.href = `/${searchParams
                        .get('re')
                        .substring(1)}`;
                } else {
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                if (error.response.data.code === 1) {
                    alert('아이디나 비밀번호를 확인해주세요.');
                }
            });
    };
    return (
        <>
            <div className="border mx-auto w-2/12 py-3">
                <div className="my-3 flex mx-auto justify-center">
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            className="px-2 border rounded-sm mb-3 w-10/12 h-5 block text-xs placeholder:text-xs"
                            value={email}
                            onChange={onEmailChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="px-2 border rounded-sm w-10/12 h-5 block text-xs placeholder:text-xs"
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="text-xs border w-3/12 bg-gray-50 rounded-sm duration-150 hover:duration-150 hover:bg-gray-100"
                        onClick={onLoginClick}
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

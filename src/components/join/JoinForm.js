import axios from 'axios';
import { useState } from 'react';
import VerifyJoinForm from './VerifyJoinForm';

function JoinForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onPasswordVerifyChange = (e) => {
        setPasswordVerify(e.target.value);
    };
    const onNicknameChange = (e) => {
        setNickname(e.target.value);
    };
    const onAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const onJoinClick = () => {
        const verify = new VerifyJoinForm();
        if (!verify.verifyPassword(password, passwordVerify)) {
            alert('비밀번호가 같지 않습니다.');
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        // TODO
        const form = {
            email: email,
            password: password,
            nickname: nickname,
            address: address,
        };
        axios
            .post('http://localhost:8080/join', form)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="w-2/12 mx-auto text-start">
                <div>
                    <label
                        htmlFor="email"
                        className="pl-1 text-sm text-gray-700"
                    >
                        이메일
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="border block px-2 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm"
                        value={email}
                        onChange={onEmailChange}
                    />
                    <label
                        htmlFor="password"
                        className="pl-1 text-sm text-gray-700"
                    >
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={`border block px-1 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm ${
                            passwordError && 'border-red-300'
                        }`}
                        value={password}
                        onChange={onPasswordChange}
                    />
                    <label
                        htmlFor="password_verify"
                        className="pl-1 text-sm text-gray-700"
                    >
                        비밀번호 확인
                    </label>
                    <input
                        type="password"
                        id="password_verify"
                        className={`border block px-1 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm ${
                            passwordError && 'border-red-300'
                        }`}
                        value={passwordVerify}
                        onChange={onPasswordVerifyChange}
                    />
                    <label
                        htmlFor="nickname"
                        className="pl-1 text-sm text-gray-700"
                    >
                        별명
                    </label>
                    <input
                        type="text"
                        id="nickname"
                        className="border block px-1 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm"
                        value={nickname}
                        onChange={onNicknameChange}
                    />
                    <label
                        htmlFor="address"
                        className="pl-1 text-sm text-gray-700"
                    >
                        주소
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="border block px-1 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm"
                        value={address}
                        onChange={onAddressChange}
                    />
                </div>
                <div className="flex justify-evenly">
                    <button
                        type="button"
                        className="px-3 py-1.5 text-sm rounded-sm bg-gray-200 text-gray-700 duration-150 hover:duration-150 hover:bg-gray-300"
                        onClick={onJoinClick}
                    >
                        가입하기
                    </button>
                    <button
                        type="button"
                        className="px-3 py-1.5 text-sm rounded-sm bg-gray-200 text-gray-700 duration-150 hover:duration-150 hover:bg-gray-300"
                        onClick={() => (window.location = '/login')}
                    >
                        취소
                    </button>
                </div>
            </div>
        </>
    );
}
export default JoinForm;

import axios from 'axios';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import VerifyJoinForm from './VerifyJoinForm';

function JoinForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [nickname, setNickname] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);
    const [addressError, setAddressError] = useState(false);

    const open = useDaumPostcodePopup();

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
    const onZipcodeChange = (e) => {
        setZipcode(e.target.value);
    };
    const onAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const onAddressClick = () => {
        open({ onComplete: addressSetting });
    };

    const addressSetting = (data) => {
        setAddress(data.address);
        setZipcode(data.zonecode);
    };

    const onJoinClick = () => {
        const verify = new VerifyJoinForm();
        if (!verify.veryfiEmail(email)) {
            alert('이메일을 제대로 입력해주세요.');
            setEmailError(true);
            return;
        }
        setEmailError(false);
        if (!verify.verifyPassword(password, passwordVerify)) {
            alert('비밀번호를 제대로 입력해주세요.');
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        if (!verify.verifyNickname(nickname)) {
            alert('닉네임은 8자 까지 입력이 가능합니다.');
            setNicknameError(true);
            return;
        }
        setNicknameError(false);
        if (!verify.verifyAddress(address)) {
            alert('주소를 입력해주세요.');
            setAddressError(true);
            return;
        }
        setAddressError(false);
        const form = {
            email: email,
            password: password,
            nickname: nickname,
            address: address,
            zipcode: zipcode,
        };
        axios
            .post('http://localhost:8080/member/join', form)
            .then((response) => {
                window.location.href = '/login';
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 111) {
                    alert('이미 가입한 이메일입니다.');
                    setEmailError(true);
                } else if (code === 222) {
                    alert('이미 가입한 닉네임입니다.');
                    setNicknameError(true);
                }
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
                        className={`border block px-2 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm ${
                            emailError && 'border-red-300'
                        }`}
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
                        className={`border block px-1 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm ${
                            nicknameError && 'border-red-300'
                        }`}
                        value={nickname}
                        onChange={onNicknameChange}
                    />
                    <label
                        htmlFor="address"
                        className="pl-1 text-sm text-gray-700 block"
                    >
                        주소
                    </label>
                    <input
                        type="number"
                        id="address"
                        className={`border px-1 text-xs placeholder:text-xs w-20 mb-5 mt-1 h-5 rounded-sm mr-5 ${
                            addressError && 'border-red-300'
                        }`}
                        placeholder="우편번호"
                        disabled
                        value={zipcode}
                        onChange={onZipcodeChange}
                    />
                    <button
                        type="button"
                        className="border px-1 text-xs placeholder:text-xs w-20 mb-5 mt-1 h-5 rounded-sm"
                        onClick={onAddressClick}
                    >
                        주소찾기
                    </button>
                    <input
                        type="text"
                        className={`border block px-1 text-xs placeholder:text-xs mx-auto w-full mb-5 mt-1 h-5 rounded-sm ${
                            addressError && 'border-red-300'
                        }`}
                        placeholder="주소"
                        disabled
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

import axios from 'axios';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import JoinValidator from '../../components/join/JoinValidator';

function FindPassword() {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [street, setStreet] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [uuid, setUuid] = useState('');
    const [after, setAfter] = useState(false);

    const open = useDaumPostcodePopup();

    const onAddressClick = () => {
        open({ onComplete: addressSetting });
    };

    const addressSetting = (data) => {
        setStreet(data.address);
        setZipcode(data.zonecode);
    };

    const onSubmit = () => {
        const member = {
            email,
            nickname,
            address: { street, zipcode },
        };
        axios
            .post('/member/password/forget/validate', member)
            .then((response) => {
                setUuid(response.data);
                setAfter(true);
            })
            .catch((error) => {
                alert('정보가 올바르지 않습니다.');
            });
    };

    const changePassword = () => {
        const validator = new JoinValidator();
        if (!validator.verifyPassword(password, passwordVerify)) return;

        const dto = {
            uuid,
            password,
        };

        axios
            .post('/member/password/forget/change', dto)
            .then((response) => {
                alert('변경되었습니다.');
                window.location.href = '/login';
            })
            .catch((error) => {
                alert('세션이 만료되었습니다.');
                window.location.reload();
            });
    };

    return (
        <>
            {!after ? (
                <div className="w-3/12 text-center mx-auto border">
                    <label htmlFor="email" className="text-sm">
                        이메일
                    </label>
                    <input
                        id="email"
                        type="text"
                        className="border block px-1 text-xs placeholder:text-xs mx-auto w-7/12 mb-5 mt-1 h-5 rounded-sm"
                        placeholder="asdf@asdf.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="nickname" className="text-sm">
                        닉네임
                    </label>
                    <input
                        id="nickname"
                        type="text"
                        className="border block px-1 text-xs placeholder:text-xs mx-auto w-7/12 mb-5 mt-1 h-5 rounded-sm"
                        placeholder="BorrowMine"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
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
                        className={`border px-1 text-xs placeholder:text-xs w-20 mb-5 mt-1 h-5 rounded-sm mr-5`}
                        placeholder="우편번호"
                        disabled
                        value={zipcode}
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
                        className={`border block px-1 text-xs placeholder:text-xs mx-auto w-7/12 mb-5 mt-1 h-5 rounded-sm`}
                        placeholder="주소"
                        disabled
                        value={street}
                    />
                    <button
                        className="px-3 py-1 rounded-md bg-sky-100 mr-4 mt-10 mb-20 duration-300 hover:duration-300 hover:bg-sky-200 text-gray-600"
                        onClick={() => onSubmit()}
                    >
                        확인
                    </button>
                    <button
                        className="px-3 py-1 rounded-md  bg-red-100 duration-300 hover:duration-300 hover:bg-red-200 text-gray-600"
                        onClick={() => window.history.back()}
                    >
                        취소
                    </button>
                </div>
            ) : (
                <div className="w-3/12 text-center mx-auto border">
                    <h1 className="text-xl my-10 text-gray-700">
                        비밀번호 변경
                    </h1>
                    <input
                        type="password"
                        className="border block px-1 text-sm placeholder:text-sm mx-auto w-7/12 mb-5 mt-1 h-5 rounded-sm"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="border block px-1 text-sm placeholder:text-sm mx-auto w-7/12 mb-5 mt-1 h-5 rounded-sm"
                        placeholder="password"
                        value={passwordVerify}
                        onChange={(e) => setPasswordVerify(e.target.value)}
                    />
                    <button
                        className="px-3 py-1 rounded-md bg-sky-100 mr-4 mt-10 mb-20 duration-300 hover:duration-300 hover:bg-sky-200 text-gray-600"
                        onClick={() => changePassword()}
                    >
                        변경
                    </button>
                    <button
                        className="px-3 py-1 rounded-md  bg-red-100 duration-300 hover:duration-300 hover:bg-red-200 text-gray-600"
                        onClick={() => setAfter(false)}
                    >
                        취소
                    </button>
                </div>
            )}
        </>
    );
}
export default FindPassword;

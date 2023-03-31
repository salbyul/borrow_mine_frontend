import axios from 'axios';
import JoinValidator from '../join/JoinValidator';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useEffect, useState } from 'react';

function ProfileHome() {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [street, setStreet] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [password, setPassword] = useState('');

    const open = useDaumPostcodePopup();

    const onAddressClick = () => {
        open({ onComplete: addressSetting });
    };

    const addressSetting = (data) => {
        setStreet(data.address);
        setZipcode(data.zonecode);
    };

    useEffect(() => {
        axios
            .get('/member/info')
            .then((response) => {
                const member = response.data;
                setEmail(member.email);
                setNickname(member.nickname);
                setStreet(member.address.street);
                setZipcode(member.address.zipcode);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const onSubmitClick = () => {
        const validator = new JoinValidator();

        if (password.length < 8) {
            alert('비밀번호를 제대로 입력해주세요.');
            return;
        }

        if (!validator.verifyNickname(nickname)) {
            return;
        }
        if (!validator.verifyAddress(street)) {
            return;
        }
        const form = {
            email: email,
            password: password,
            nickname: nickname,
            address: { street: street, zipcode: zipcode },
        };

        axios
            .post('/member/info', form)
            .then((response) => {
                console.log(response);
                alert('변경이 완료되었습니다.');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                const code = error.response.data.code;
                if (code === 444) {
                    alert('비밀번호를 제대로 입력해주세요.');
                }
            });
    };
    return (
        <>
            <div className="text-center">
                <div className="my-5">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="text"
                        id="email"
                        className="border pl-1 text-sm text-gray-700 placeholder:text-sm w-5/12 block mx-auto mt-2"
                        value={email}
                        disabled
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="nickname">별명</label>
                    <input
                        type="text"
                        id="nickname"
                        className="border pl-1 text-sm text-gray-700 placeholder:text-sm w-5/12 block mx-auto mt-2"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="address" className="block">
                        주소
                    </label>
                    <input
                        type="number"
                        id="address"
                        className={`border pl-1 text-sm text-gray-700 placeholder:text-sm mx-auto mt-2 mr-2`}
                        placeholder="우편번호"
                        disabled
                        value={zipcode}
                    />
                    <button
                        type="button"
                        className="border px-1 text-xs placeholder:text-xs w-20 mb-5 mt-1 h-6 rounded-sm"
                        onClick={onAddressClick}
                    >
                        주소찾기
                    </button>
                    <input
                        type="text"
                        className={`border pl-1 text-sm text-gray-700 placeholder:text-sm w-5/12 block mx-auto mt-2`}
                        placeholder="주소"
                        disabled
                        value={street}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        className="border pl-1 text-sm text-gray-700 placeholder:text-sm w-5/12 block mx-auto mt-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="text-sm bg-sky-300 rounded-md px-5 py-1 text-gray-700 duration-150 hover:duration-150 hover:bg-sky-400"
                    onClick={onSubmitClick}
                >
                    저장
                </button>
            </div>
        </>
    );
}
export default ProfileHome;

import { useState } from 'react';
import JoinValidator from '../join/JoinValidator';
import axios from 'axios';

function ProfileChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');

    const onSubmit = () => {
        const validator = new JoinValidator();
        if (!validator.verifyPassword(password, passwordVerify)) return;

        const data = {
            currentPassword,
            password,
        };

        axios
            .post('/member/password/change', data)
            .then((response) => {
                alert('비밀번호가 변경되었습니다.');
                setCurrentPassword('');
                setPassword('');
                setPasswordVerify('');
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 401) {
                    alert('기존의 비밀번호를 확인해주세요.');
                } else if (code === 103) {
                    alert('같은 비밀번호로 변경이 불가능합니다.');
                }
            });
    };

    return (
        <>
            <div className="mt-10">
                <label
                    htmlFor="current"
                    className="block py-1 text-sm text-gray-700"
                >
                    현재 비밀번호
                </label>
                <input
                    type="password"
                    id="current"
                    className="border pl-1"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label
                    htmlFor="password"
                    className="block py-1 text-sm text-gray-700"
                >
                    변경할 비밀번호
                </label>
                <input
                    type="password"
                    id="password"
                    className="border pl-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label
                    htmlFor="passwordVerify"
                    className="block py-1 text-sm text-gray-700"
                >
                    비밀번호 확인
                </label>
                <input
                    type="password"
                    id="passwordVerify"
                    className="border pl-1"
                    value={passwordVerify}
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />
                <button
                    className="block mx-auto px-3 py-1 bg-sky-100 rounded-lg mt-4"
                    onClick={() => onSubmit()}
                >
                    변경
                </button>
            </div>
        </>
    );
}
export default ProfileChangePassword;

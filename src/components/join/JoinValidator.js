class JoinValidator {
    verifyPassword = (password, passwordVerify) => {
        if (password === '' || password !== passwordVerify) {
            alert('비밀번호를 제대로 입력해주세요.');
            return false;
        }
        if (password.length < 8) {
            alert('비밀번호는 8자 이상이어야 합니다.');
            return false;
        }
        return true;
    };
    //
    veryfiEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        alert('이메일을 제대로 입력해주세요.');
        return false;
    };
    verifyNickname = (nickname) => {
        const length = nickname.length;
        if (length > 8 || length === 0) {
            alert('닉네임은 8자 까지 입력이 가능합니다.');
            return false;
        }
        return true;
    };
    verifyAddress = (address) => {
        if (address.length === 0) {
            alert('주소를 입력해주세요.');
            return false;
        }
        return true;
    };
}
export default JoinValidator;

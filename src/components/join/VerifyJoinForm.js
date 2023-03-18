class VerifyJoinForm {
    verifyPassword = (password, passwordVerify) => {
        if (password === '') return false;
        if (password === passwordVerify) return true;
        return false;
    };
    veryfiEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    };
    verifyNickname = (nickname) => {
        const length = nickname.length;
        if (length > 8 || length === 0) return false;
        return true;
    };
    verifyAddress = (address) => {
        if (address.length === 0) return false;
        return true;
    };
}
export default VerifyJoinForm;

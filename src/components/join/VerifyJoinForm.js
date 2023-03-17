class VerifyJoinForm {
    verifyPassword = (password, passwordVerify) => {
        if (password === passwordVerify) return true;
        return false;
    };
}
export default VerifyJoinForm;

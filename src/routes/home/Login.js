import LoginForm from '../../components/login/LoginForm';

function Login() {
    return (
        <>
            <div className="w-screen h-screen text-center">
                <h1 className="mb-12 text-4xl">로그인</h1>
                <LoginForm />
            </div>
        </>
    );
}
export default Login;

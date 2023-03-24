import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/header/Header';
import Home from './routes/home/Home';
import Login from './routes/home/Login';
import Borrow from './routes/Borrow';
import Join from './routes/home/Join';
import BorrowDetail from './routes/borrow/BorrowDetail';
import Chat from './routes/Chat';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* TODO 비밀번호 찾기*/}
                    <Route path="/login" element={<Login />} />

                    <Route path="/join" element={<Join />} />
                    {/* TODO 전부*/}
                    <Route path="/borrow" element={<Borrow />} />
                    {/* TODO 요청 */}
                    <Route path="/borrow/:id" element={<BorrowDetail />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

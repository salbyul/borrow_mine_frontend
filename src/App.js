import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Home from './routes/home/Home';
import Login from './routes/home/Login';
import BorrowList from './routes/BorrowList';
import Join from './routes/home/Join';
import BorrowDetail from './routes/borrow/BorrowDetail';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* TODO  비밀번호 찾기*/}
                    <Route path="/login" element={<Login />} />

                    <Route path="/join" element={<Join />} />
                    {/* TODO */}
                    <Route path="/borrow" element={<BorrowList />} />
                    <Route path="/borrow/:id" element={<BorrowDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

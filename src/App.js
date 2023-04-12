import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/header/Header';
import Home from './routes/home/Home';
import Login from './routes/home/Login';
import Borrow from './routes/borrow/Borrow';
import Join from './routes/home/Join';
import BorrowDetail from './routes/borrow/BorrowDetail';
import BorrowCreate from './routes/borrow/BorrowCreate';
import Chat from './routes/Chat';
import Profile from './routes/Profile';
import FindPassword from './routes/find_password/FindPassword';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/password" element={<FindPassword />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/borrow" element={<Borrow />} />
                    <Route
                        path="/borrow/detail/:id"
                        element={<BorrowDetail />}
                    />
                    <Route path="/borrow/create" element={<BorrowCreate />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat/:nickname" element={<Chat />} />
                    <Route path="/profile/*" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

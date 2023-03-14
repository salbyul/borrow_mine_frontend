import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Home from './routes/home/Home';
import Login from './routes/home/Login';
import BorrowList from './routes/BorrowList';

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* TODO */}
                    <Route path="/login" element={<Login />} />
                    {/* TODO */}
                    <Route path="/borrow" element={<BorrowList />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

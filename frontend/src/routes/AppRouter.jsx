import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Hikes from '../pages/Hikes';
import Guides from '../pages/Guides';
import Booking from '../pages/Booking';
import Reviews from '../pages/Reviews';
import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import Profile from '../pages/Profile';


function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hikes" element={<Hikes />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}


export default AppRouter;
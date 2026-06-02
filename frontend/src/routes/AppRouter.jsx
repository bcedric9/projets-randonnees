import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Hikes from '../pages/Hikes';
import Guides from '../pages/Guides';
import Booking from '../pages/Booking';
import Reviews from '../pages/Reviews';
import Dashboard from '../pages/Dashboard';


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
        </Routes>
    );
}


export default AppRouter;
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { IoSearch } from 'react-icons/io5';
import { FaShoppingCart, FaMapMarkerAlt } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import LogoImage from '../assets/logo.png';
import StoreSelect from './StoreSelect';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const [selectedStore, setSelectedStore] = useState(null);

    const isSearchPage = location.pathname === "/search";

    const handleSearchChange = (e) => {
        navigate(`/search?q=${e.target.value}`);
    };

    return (
        <nav className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 bg-white shadow-md">
            {/* Logo */}
            <Link to="/">
                <img src={LogoImage} alt="Logo" className="w-32 cursor-pointer" />
            </Link>

            {/* Search Bar */}
            <div className="w-full max-w-lg h-11 lg:h-12 rounded-lg border flex items-center text-neutral-500 bg-gray-100 overflow-hidden">
                <button className="p-3">
                    <IoSearch size={22} />
                </button>
                <div className="w-full">
                    {!isSearchPage ? (
                        <div onClick={() => navigate('/search')} className="w-full h-full flex items-center cursor-pointer">
                            <TypeAnimation
                                sequence={[
                                    'Search for medicines',
                                    1000,
                                    'Search for vitamins',
                                    1000,
                                    'Search for wellness products',
                                    1000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Search for medicines and health products"
                            autoFocus
                            className="bg-transparent w-full h-full outline-none"
                            onChange={handleSearchChange}
                        />
                    )}
                </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-gray-700">
                <Link to="/about" className="hover:text-blue-600">About</Link>
                <Link to="/contact" className="hover:text-blue-600">Contact</Link>
                <Link to="/offers" className="hover:text-blue-600">Offers</Link>
            </div>

            {/* Account, Store & Cart */}
            <div className="flex items-center gap-5">
                {user ? (
                    <>
                        {/* Store Selection */}
                        <StoreSelect user={user} onStoreSelect={setSelectedStore} />

                        {/* Cart (Visible after login) */}
                        <Link to="/cart" className="relative">
                            <FaShoppingCart size={24} className="text-gray-700 hover:text-blue-600" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                        </Link>

                        {/* User Profile */}
                        <UserButton />
                    </>
                ) : (
                    <button onClick={openSignIn} className="bg-blue-600 text-white px-5 py-2 rounded-full">
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import Header from '@/components/LoginPage/Header';
import LoginModal from '@/components/LoginPage/LoginModal';
import backgroundImg from '@/assets/common/netflix-background.png'

const Login = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ 
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: '120%' 
            }}
        >
            <div className="absolute inset-0 bg-black opacity-75" />

            <div className="relative z-10">
                <Header />
                <LoginModal />
            </div>
        </div>
    );
};

export default Login;
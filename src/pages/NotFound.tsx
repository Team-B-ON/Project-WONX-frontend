import React from 'react';
import backgroundImg from '@/assets/common/netflix-background.png';

const NotFound = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ 
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: '100%' 
            }}
        >
            <div className="absolute inset-0 bg-black/80" />

            <div className="absolute inset-0 z-20 flex items-center justify-center min-h-screen text-white">
                <div className="text-center">
                <h1 className="text-4xl font-bold text-800 text-[60px] mb-4">🍿404</h1>
                <p className="text-600 text-lg text-[20px]">페이지를 찾을 수 없습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
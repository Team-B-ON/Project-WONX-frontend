import React from 'react';
import logo from '@/assets/common/logo_image.svg';

const Header = () => {
    return (
        <header className="text-white h-[92px] flex items-center">
            <img className="w-[160px] h-auto ml-[148px] mt-[4px]" src={logo}/>
        </header>
    );
};

export default Header;

import React from 'react';
import { Button } from '../ui/button';
import logo from '../../../public/logo.svg'

function Header(props) {
    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-2'>
                <img src={logo} alt="" />
            <div>
                <Button>Sign up</Button>
            </div>
            
        </div>
    );
}

export default Header;
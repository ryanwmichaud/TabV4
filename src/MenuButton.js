import React from 'react';


const MenuButton = ({isMobileMenuVisible, setIsMobileMenuVisible}) => {

    return (
        <button 
            className='toggle-menu' 
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
        >
        </button> 
    )
}

export {MenuButton}
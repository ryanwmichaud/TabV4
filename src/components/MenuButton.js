import React from 'react'


const MenuButton = ({isMobileMenuVisible, setIsMobileMenuVisible}) => {

    return (
        <button 
            className='toggle-menu' 
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
        >
            <div className='toggle-menu-bar'></div>
            <div className='toggle-menu-bar'></div>
            <div className='toggle-menu-bar'></div>
        </button> 
    )
}

const MenuButtonClose = ({isMobileMenuVisible, setIsMobileMenuVisible}) => {

    return (
        <button 
            className='toggle-menu-close' 
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
        >
             x
        </button> 
    )
}

export {MenuButton, MenuButtonClose}
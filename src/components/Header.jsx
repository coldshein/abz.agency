import React from 'react'

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header-inner">
                    <div className="logo-container">
                        <img src="assets/logo.svg" alt="" />
                    </div>
                    <div className="header-menu">
                        <button className="yellow-btn">Users</button>
                        <button className="yellow-btn">Sign up</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
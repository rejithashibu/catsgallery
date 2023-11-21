import React from 'react';
import { useHistory } from 'react-router-dom';
import './Header.scss'

const Header = () => {
    const history = useHistory()
    return (
        <div className="header" onClick={() => history.push('/')}><span className="header-text">Cats</span><span className="header-text-gallery">Gallery</span></div>
    )
}

export default Header;
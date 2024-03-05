import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.module.css'

class Header extends React.Component {
    render() {
        return (
            <header className={style.header}>
                <span><Link to="/">AsyncHome</Link></span>
                <span><Link to="/about">PromiseHome</Link></span>
            </header>
        )
    }
}

export default Header;
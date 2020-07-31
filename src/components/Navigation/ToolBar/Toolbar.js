import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Burger from '../../../assets/image/burger-logo.png';
import NavItems from '../NavItems/NavItems';
import Bars from '../Sidebar/DrawerToggle/Bars';
import { Link } from 'react-router-dom';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Bars clicked={props.setShowSidebar} />
            <Link to="/">
                <Logo image={Burger} height='80%' />
            </Link>
            <nav>
                <NavItems />
            </nav>
        </header>
    )
}

export default Toolbar;
import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';

const NavItems = (props) => {

    return (
        <ul className={classes.NavItems}>
            <NavItem link="/" exact >
                Burger Builder
            </NavItem>
            {props.isAuth ? 
                <NavItem link="/orders">
                    Orders
                </NavItem>
             : null}
            {!props.isAuth ?
            <NavItem link="/auth">
                Authenticate
            </NavItem> : 
            <NavItem link="/logout">
                Logout
            </NavItem>
            }
        </ul>
    )
}

export default  NavItems;
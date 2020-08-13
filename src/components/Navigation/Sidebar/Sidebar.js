import React from 'react';
import Logo from '../../Logo/Logo';
import Burger from '../../../assets/image/burger-logo.png';
import NavItems from '../NavItems/NavItems';
import classes from './Sidebar.module.css';
import Aux from '../../../HOC/Auxillary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidebar = (props) => {

    return (
        <Aux>
            <Backdrop close={props.setShowSidebar} show={props.show} />
            <div className={[classes.Sidebar,props.show?classes.Open:classes.Close].join(' ')} onClick={props.setShowSidebar}>
                <Logo image={Burger} height='40px' />
                <nav>
                    <NavItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default Sidebar;
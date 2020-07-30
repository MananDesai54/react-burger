import React,{ useState } from 'react';

import PropTypes from 'prop-types';
import Aux from '../../../HOC/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../Navigation/ToolBar/Toolbar';
import Sidebar from '../../Navigation/Sidebar/Sidebar';

const Layout = props => {

    const [showSidebar,setShowSidebar] = useState(false);
    
    const hideSidebar = ()=>{
        setShowSidebar(false);
    }
    
    const sidebarShow = ()=>{
        setShowSidebar(true);
    }

    return (
        <Aux>
            <Toolbar setShowSidebar={sidebarShow} />
            <Sidebar show={showSidebar} setShowSidebar={hideSidebar} />
            <main className={classes.content}>
                {props.children}
            </main>
        </Aux>
    )
}

Layout.propTypes = {
    props:PropTypes.object,
}

export default Layout;

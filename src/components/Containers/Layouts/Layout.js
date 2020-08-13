import React,{ useState } from 'react';
import { connect } from 'react-redux';

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
            <Toolbar setShowSidebar={sidebarShow} isAuth={props.isAuth} />
            <Sidebar show={showSidebar} setShowSidebar={hideSidebar} isAuth={props.isAuth} />
            <main className={classes.content}>
                {props.children}
            </main>
        </Aux>
    )
}

Layout.propTypes = {
    props:PropTypes.object,
}

const mapStateToProps = state => {
    return {
        isAuth : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

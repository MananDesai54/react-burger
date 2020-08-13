import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => {dispatch(Actions.logout())}
    }
}

export default connect(null,mapDispatchToProps)(Logout);
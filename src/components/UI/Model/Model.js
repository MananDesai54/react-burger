import React from 'react';
import classes from './Model.module.css';
import Aux from '../../../HOC/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Model extends React.Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show!==this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop 
                    show={this.props.show}
                    close={this.props.clicked}
                />
                <div 
                className={classes.Modal}
                style={{
                    transform:this.props.show?'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.show?1:0
                }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Model;
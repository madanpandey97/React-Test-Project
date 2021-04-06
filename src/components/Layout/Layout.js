import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SIdeDrawer/SideDrawer';
// import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }
    render(){
        return(
            <Aux>
            <Toolbar  drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.SideDrawerClosedHandler} />
            <main className={styles.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }


};

export default Layout;
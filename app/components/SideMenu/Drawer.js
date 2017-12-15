import React , { Component }from 'react';
import {
  View
} from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
export default class Drawers extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  closeDrawer() {
    this.setState({isOpen: false});
    this.props.closeDrawer();
  }

  componentWillReceiveProps(props) {
    this.setState({isOpen: props.isOpen});
  }

  render() {
    return (
      <Drawer
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2}
        ref={(ref) => this._drawer = ref}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        onClose={() => {this.closeDrawer()}}
        open={this.state.isOpen}
        content={<SideMenu navigate={this.props.navigate} navigationDispatch={this.props.navigationDispatch} closeDrawer={this.closeDrawer}  />}
      >
        {this.props.children}
      </Drawer>
    )
  }
};

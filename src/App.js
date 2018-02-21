import React, { Component } from 'react';
import './App.css';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionList from 'material-ui/svg-icons/action/list';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//import DeviceDrawer from './components/DeviceDrawer'
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/image/edit';

import AddStopDialog from './components/addStopDialog'
import AddRouteDialog from './components/addRouteDialog'
import RouteDrawer from './components/routeDrawer'

import Maps from './utils/maps'

class App extends Component {
    
    constructor(props){
        super(props);
        this.state={
            addPopoverOpen: false,
            popoverAnchorEL: null,
            isAddStopDialogOpen: false,
            isAddRouteDialogOpen: false,
            editRouteId: null,
            routeId: null,
            routeDrawerOpen:false
        }
    }
    componentDidMount = () => {
          window.initMap = this.initMap;
          this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyD7BzO-CIAeVpISd5cv3ZoOnb7YnZ9iHXs&callback=initMap')
      }
      
      loadJS = (src) => {
          var ref = window.document.getElementsByTagName("script")[0];
          var script = window.document.createElement("script");
          script.src = src;
          script.async = true;
          ref.parentNode.insertBefore(script, ref);
      }
      
      initMap = function(){
      
          var mumbai = {lat:19.131508, lng:72.868818};
          window.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: mumbai,
          });
          
      }
    
    openAddPopover = (event) => {
        event.preventDefault();
        this.setState({
          addPopoverOpen: true,
          popoverAnchorEL: event.currentTarget,
        });
    }
    
    handlePopoverClose = () => {
        this.setState({
          addPopoverOpen: false
      });
    }
    
    openAddRouteDialog = () => {
        this.setState({editRouteId:null} , () =>{
            this.openRouteDialog();
        })
    }
    openEditRouteDialog = () => {
        this.setState({editRouteId:this.state.routeId} , () =>{
            this.openRouteDialog();
        })
    }
    
    openRouteDialog = () => {
        this.setState({isAddRouteDialogOpen:true})
    }
    
    openAddStopDialog = () => {
        this.setState({isAddStopDialogOpen:true})
    }
    
    closeAddRouteDialog = () => {
        this.setState({isAddRouteDialogOpen:false,editRouteId:null})
    }
    closeAddStopDialog = () => {
        this.setState({isAddStopDialogOpen:false})
    }
    
    openRouteDrawer = () => {
        this.setState({routeDrawerOpen:true})
    }
    
    routeClicked = (id) => {
        this.setState({routeDrawerOpen:false,routeId:id});
        Maps.showPolyline(id);
    }
    
    
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div className="App">
                <FloatingActionButton className= "openDrawerButton" onClick={this.openRouteDrawer} >
                    <ActionList color={'#FFFFFF'}/>
                </FloatingActionButton>
                {(this.state.routeId != null)
                    ?<FloatingActionButton className= "editButton" onClick={this.openEditRouteDialog} >
                        <ContentEdit color={'#FFFFFF'}/>
                    </FloatingActionButton>
                    :null}
                <FloatingActionButton className= "addButton" onClick={this.openAddPopover}>
                    <ContentAdd color={'#FFFFFF'}/>
                </FloatingActionButton>
                <Popover
                    open={this.state.addPopoverOpen}
                    anchorEl={this.state.popoverAnchorEL}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handlePopoverClose}
                    animation={PopoverAnimationVertical}
                >
                    <Menu>
                        <MenuItem primaryText="Add Route" onClick={this.openAddRouteDialog}/>
                        <MenuItem primaryText="Add Stop" onClick={this.openAddStopDialog}/>
                    </Menu>
                </Popover>
                <AddStopDialog open={this.state.isAddStopDialogOpen} close={this.closeAddStopDialog}/>
                <AddRouteDialog open={this.state.isAddRouteDialogOpen} close={this.closeAddRouteDialog} editRouteId={this.state.editRouteId}/>
                <RouteDrawer open={this.state.routeDrawerOpen} routeClicked={this.routeClicked}/>
                <div className="map" ref="map" id="map"></div>
            </div>
            </MuiThemeProvider>
    );
  }
}

export default App;

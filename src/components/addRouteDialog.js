import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

import Subheader from 'material-ui/Subheader';

import Utils from '../utils/utils'

export default class AddStopDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        routeId:null,
        routeName: null,
        direction: 0,
        status: 0,
        listOfStops:[],
        type:0,
        listOfAllStops:[]
          
    }
  }
  
  componentWillReceiveProps(nextProps){
      if(nextProps.editRouteId !== null){
         var route = Utils.getRouteById(nextProps.editRouteId);
         this.setState({
             open:nextProps.open,
             routeId:route.id,
             routeName: route.routeName,
             direction: route.direction,
             status: route.status,
             listOfStops:route.listOfStops,
             type:route.type
         });
      }
      else{
          this.setState({
              open:nextProps.open
          });
      }
      
      let listOfAllStops = Utils.getAllStops().map(stop => {
          stop.selected = false;
          return stop
      });
      
      
      for(var i = 0;i < listOfAllStops;i++){
          if(this.state.listOfStops.includes(listOfAllStops[i].id)){
              listOfAllStops[i].selected = true;
          }
      }
      
      this.setState({
          listOfAllStops:listOfAllStops
      });
      

      
  }
  
  handleClose = () => {
   this.setState({open: false,
                   routeId:null,
                   routeName: null,
                   direction: 'UP',
                   status: 'INACTIVE',
                   listOfStops:[],
                   type:'GENERAL'});
   this.props.close();
  };
  
  handleDelete = () => {
      Utils.deleteRoute(this.state.routeId);
      this.props.close();
  }
  
  isSubmitActive = () =>{
      return ((this.state.routeName != null )
              && (this.state.direction != null )
              && (this.state.status != null )
              && (this.state.type!= null ));
  }
  
  handleSubmit = () => {
      //console.log(this.state);
      let listOfStops = [];
      for(let l of this.state.listOfAllStops){
          if(l.selected){
              listOfStops.push(l.id);
          }
      }
      if((this.state.routeId == null)){
          Utils.addRoute(this.state.routeName, this.state.direction, this.state.status ,listOfStops, this.state.type);
      }
      else{
          Utils.editRoute(this.state.routeId,this.state.routeName, this.state.direction, this.state.status ,listOfStops, this.state.type);
      }
      
      this.handleClose();
  }
  
  stopClicked = (i) => {
      var temp = this.state.listOfAllStops;
      temp[i].selected = !temp[i].selected;
      this.setState({listOfAllStops:temp});
  }

  render() {
      const actions = [];
      if(this.state.routeId != null){
          actions.push(
              <FlatButton
                  label="Delete"
                  secondary={true}
                  onClick={this.handleDelete}
                  style={{position:'absolute',left:'10px'}}
              />
          )
      }
      actions.push(
          <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
          />);
      actions.push(
          <FlatButton
              label="Submit"
              primary={true}
              disabled={!this.isSubmitActive()}
              onClick={this.handleSubmit}
          />);
    // [
    //   <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onClick={this.handleClose}
    //   />,
    //   <FlatButton
    //       label="Submit"
    //       primary={true}
    //       disabled={!this.isSubmitActive()}
    //       onClick={this.handleSubmit}
    //   />
    //   {(this.state.routeId != null)
    //   ?<FlatButton
    //       label="Submit"
    //       primary={true}
    //       disabled={!this.isSubmitActive()}
    //       onClick={this.handleSubmit}
    //    />
    //    :null},
    // ];
    return (
          <Dialog
          title={(this.state.routeId == null)?"Add Route":"Edit Route"}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
            
                <div style={{width:"100%"}}>
                    <div style={{width:'50%',float:'left'}}>
                        
                        <TextField
                                id="name"
                                floatingLabelText="Route name"
                                value={this.state.routeName}
                                onChange={(e, newValue) => this.setState({ routeName: newValue})}
                        />
                        <br />
                        
                        <SelectField
                          floatingLabelText="Direction"
                          value={this.state.direction}
                          onChange={(e, newValue) => this.setState({ direction: newValue})}
                        >
                                <MenuItem value={0} primaryText="UP" />
                                <MenuItem value={1} primaryText="DOWN" />
                        </SelectField>
                        <br />
                        
                        
                        <SelectField
                          floatingLabelText="Type"
                          value={this.state.type}
                          onChange={(e, newValue) => this.setState({ type: newValue})}
                        >
                                <MenuItem value={0} primaryText="General" />
                                <MenuItem value={1} primaryText="AC" />
                                
                        </SelectField>
                        <br />
                        
                        
                        {/* <TextField
                                id="stopList"
                                disabled={true}
                                floatingLabelText="Stop List"
                                value={this.state.listOfStops.toString()}
                        />
                        <br /> */}
                        
                        
                        <SelectField
                          floatingLabelText="Status"
                          value={this.state.status}
                          onChange={(e, newValue) => this.setState({ status: newValue})}
                        >
                                <MenuItem value={0} primaryText="Inactive" />
                                <MenuItem value={1} primaryText="Active" />
                        </SelectField>
                    </div>
                    <div style={{width:'50%',float:'right'}}>
                        <Subheader>Add/Remove Stops</Subheader>
                        <List>
                          {this.state.listOfAllStops.map((stop,i) => {
                               return <ListItem key={i} primaryText={stop.stopName} rightIcon={(stop.selected)?<ActionDone />:<ContentClear />} onClick={this.stopClicked.bind(this,i)}/>
                          })}
                        </List>
                    </div>
                </div>
        </Dialog>
    )
  }
}
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Utils from '../utils/utils'

export default class AddStopDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        stopName: null,
        latitude: null,
        longitude: null
        
    }
  }
  
  componentWillReceiveProps(nextProps){
      this.setState({open:nextProps.open})
  }
  
  handleClose = () => {
   this.setState({open: false,
                   stopName: null,
                   latitude: null,
                   longitude: null});
   this.props.close();
  };
  
  isSubmitActive = () =>{
    console.log(this.state.stopName && this.state.latitude && this.state.longitude);
      return (this.state.stopName && this.state.latitude && this.state.longitude)
  }
  
  handleSubmit = () => {
      //console.log(this.state);
      Utils.addStop(this.state.stopName, this.state.latitude, this.state.longitude);
      this.handleClose();
  }

  render() {
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.isSubmitActive()}
        onClick={this.handleSubmit}
      />,
    ];
    return (
          <Dialog
          title="Add Stop"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
            
                <TextField
                    id="name"
                    floatingLabelText="Stop name"
                    onChange={(e, newValue) => this.setState({ stopName: newValue})}
                />
                <br />
                <TextField
                    id="latitude"
                    floatingLabelText="Latitude"
                    onChange={(e, newValue) => this.setState({ latitude: newValue})}
                />
                <br />
                <TextField
                    id="longitude"
                    floatingLabelText="Longitude"
                    onChange={(e, newValue) => this.setState({ longitude: newValue})}
                />
        </Dialog>
    )
  }
}
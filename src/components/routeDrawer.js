import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Utils from '../utils/utils';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileDownload from 'material-ui/svg-icons/file/file-download'
import FlatButton from 'material-ui/FlatButton';
import {default as ExcelFile, ExcelSheet} from "react-data-export";
export default class RouteDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        routeList : []
    }
  }
  
  componentWillReceiveProps(nextProps){
      if(nextProps.open){
          let routeList = Utils.getAllRoutes();
          for(let i in routeList){
              routeList[i].excelData = this.getExcelData(routeList[i].id);
          }
          this.setState({routeList:routeList})
      }
  }
  
  onMenuItemClick = (id) =>{
      this.props.routeClicked(id)
  }
  
  getExcelData = (routeId) => {
      console.log(111);
      let data = [
          {
              xSteps: 1, 
              ySteps: 2,
              columns: ["Route Id", "Route Name", "Direction", "Route Type", "Status"],
              data: [
                  
              ]
          },
          {
              xSteps: 1,
              ySteps: 2,
              columns: ["Stop Id", "Stop Name", "Location"],
              data: [
                  
              ]
          }
      ]
      let route = Utils.getRouteById(routeId);
      data[0].data.push([route.id,route.routeName,(route.direction == 0)?'UP':'Down',(route.type == 0)?'General':'AC',(route.status==0)?'Inactive':'Active']);
      route.listOfStops.forEach((stop => {
          let stopDetails = Utils.getStopById(stop);
          data[1].data.push([stopDetails.id,stopDetails.stopName,(stopDetails.latitude+","+stopDetails.longitude)]);
      }))
      return data;
  }

  render() {
       
       return (
          <div>
              <Drawer open={this.props.open}>
                  {this.state.routeList.map((route) => {
                      return <MenuItem key={route.id} onClick={this.onMenuItemClick.bind(this,route.id)}>
                          {route.routeName}
                          <div style={{marginLeft:"5px", display:'inline'}}>
                              <ExcelFile>
                                  <ExcelSheet dataSet={route.excelData} name={route.routeId+"."+route.routeName} />
                                  {/* <!-- You can add more ExcelSheets if you need --> */}
                              </ExcelFile>
                          </div>
                      </MenuItem>
                  })}
              </Drawer>
          </div>
    );
  }
}
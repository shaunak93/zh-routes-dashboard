import Utils from './utils'

let mapRoute = null;

export default class Maps {
    static showPolyline(routeId){
        
       if(mapRoute !== null){
           mapRoute.setMap(null);
       } 
       let route =  Utils.getRouteById(routeId);
       let stopArr = [];
       
       for(let stopId of route.listOfStops){
           let stop = Utils.getStopById(stopId);
           stopArr.push({lat:Number(stop.latitude),lng:Number(stop.longitude)})
       }
       
       mapRoute = new window.google.maps.Polyline({
         path: stopArr,
         geodesic: true,
         strokeColor: '#FF0000',
         strokeOpacity: 1.0,
         strokeWeight: 2
       });
       
       mapRoute.setMap(window.map);
    }
}
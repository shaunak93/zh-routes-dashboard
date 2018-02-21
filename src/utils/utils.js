
let stopList = [];
let routeList = [];
var stop = function(name,latitude,longitude){
   this.id = (stopList.length == 0)? 0 :(stopList[stopList.length-1].id + 1);
   this.stopName = name;
   this.latitude = latitude;
   this.longitude = longitude;
}

var route = function(name,direction,status,listOfStops,type){
   this.id = (routeList.length == 0)? 0 :(routeList[routeList.length-1].id + 1);
   this.routeName = name;
   this.direction = direction;
   this.status = status;
   this.listOfStops = listOfStops;
   this.type = type;
}

stopList.push(new stop("boriwali","19.241505", "72.844391"));
stopList.push(new stop("kandiwali","19.215269", "72.838238"));
stopList.push(new stop("malad west","19.195816", "72.834633"));

stopList.push(new stop("inorbit mall","19.173686", "72.836779"));
stopList.push(new stop("Andheri west","19.147008", "72.828715"));


routeList.push(new route("boriwali-andheri",0,0,[0,1,2,3,4],0));



export default class Utils {
    
    static addStop(name,latitude,longitude) {
        stopList.push(new stop(name,latitude,longitude));
        console.log(stopList);
    }
    
    static addRoute(name,direction,status,listOfStops,type) {
        routeList.push(new route(name,direction,status,listOfStops,type));
        console.log(routeList);
    }
    
    static getAllStops(){
        console.log(stopList);
        return stopList;
    }
    
    static getAllRoutes(){
        return routeList;
    }
    
    static getRouteById(id){
        for(let i = 0; i < routeList.length; i++){
            if(routeList[i].id == id){
                return routeList[i];
            }
        }
    }
    
    static getStopById(id){
        for(let i = 0; i < stopList.length; i++){
            if(stopList[i].id == id){
                return stopList[i];
            }
        }
    }
    
    static listOfStops(id){
        for(let i = 0; i < stopList.length; i++){
            if(stopList[i].id == id){
                return stopList[i];
            }
        }
    }
    
    static editRoute(id,name,direction,status,listOfStops,type){
        let i;
        for( i = 0; i < routeList.length; i++){
            if(routeList[i].id == id){
                break;
            }
        }
        routeList[i].routeName = name;
        routeList[i].direction = direction;
        routeList[i].status = status;
        routeList[i].listOfStops = listOfStops;
        routeList[i].type = type;
 
    }
    
    static deleteRoute(id){
        let i;
        for( i = 0; i < routeList.length; i++){
            if(routeList[i].id == id){
                break;
            }
        }
        routeList.splice(i,1);
        console.log(routeList);
    }
}
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';
const MapRoute = (datos) => {
    const {origen, destino} = datos
    console.log(origen)
    var greenIcon = new L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

      function AddRouting () {
        let coord = [origen.lat,origen.lng, destino.lat,destino.lng]
        return (<RoutingMachine  coord={coord}/>)
      
      }
      function AddMarkers(){
        return(
            <div>
                { origen && <Marker id = "origen" position={origen} > <Popup>Origen</Popup> </Marker> }
                { destino && <Marker id = "destino" position={destino} icon={greenIcon}> <Popup>Destino</Popup> </Marker> }
            </div>
            
        );
      }
      
      return(
        <div id="mapa">
            <MapContainer center={{ lat: 40.4167, lng: -3.70325  }} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddRouting/>
            <AddMarkers/>
            </MapContainer>
        </div>
        
      );
  
}
 
export default MapRoute;
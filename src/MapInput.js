import { useState } from "react";
import { Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet'
import L from 'leaflet';

const MapInput = () => {
    const [origen, setOrigen] = useState(null);
    const [destino, setDestino] = useState(null);
    const [selOr, setSelOr] = useState(true);

    var greenIcon = new L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const handleClick = () => {
        setSelOr(!selOr)
    }

    function LocationMarker() {
        
        const map = useMapEvents({
          click(e) {
            if(selOr){
                setOrigen(e.latlng)
            }else{
                setDestino(e.latlng)
            }
            
          },
          locationfound(e) {
            map.flyTo(e.latlng, map.getZoom())
          },
        })
        map.locate()
        return(
            <div>
                { origen && <Marker id = "origen" position={origen} > <Popup>Origen</Popup> </Marker> }
                { destino && <Marker id = "destino" position={destino} icon={greenIcon}> <Popup>Origen</Popup> </Marker> }
            </div>
            
        );
      }
      
      return(
        <div id="mapa">
            <Button variant="primary" disabled={selOr} onClick={handleClick} >Origen</Button>{' '}
            <Button variant="success" disabled={!selOr} onClick={handleClick}>Destino</Button>{' '}
            <MapContainer center={{ lat: 40.4167, lng: -3.70325  }} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            </MapContainer>
        </div>
        
      );
  
}
 
export default MapInput;
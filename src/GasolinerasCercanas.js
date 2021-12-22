import { Col, Row, Spinner } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import useFetch from "./useFetch";
const GasolinerasCercanas = (datos) => {
    const {posicion} = datos
    const { error, isPending, data: gasolineras } = useFetch("http://127.0.0.1:5000/gasolinera?longitud="+posicion.lng+"&latitud="+posicion.lat)
    var cont = 0;
    var redIcon = new L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    const actualiza=()=>{
        cont = cont+1
        return "marcador"+cont
    }
    return (  
        <Row>
        <Col xs={1}></Col>
        <Col xs={11}>
        <Row  >
            { error && <div>{ error }</div> }
            { isPending && <div>BUSCANDO GASOLINERAS <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
            
            {gasolineras && 
                <MapContainer  center={{ lat: posicion.lat, lng: posicion.lng }} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker id = "suPosición" icon={redIcon} position={posicion} > <Popup>Usted está aquí</Popup> </Marker> 
                    { gasolineras.map(gasolinera => (
                        
                        <Marker key={actualiza()} position={{lat:gasolinera.Latitud,lng:gasolinera.Longitud}} > 
                            <Popup className="Map-Marker">
                                <div>
                                    <b>Dirección:</b> {gasolinera.Dirección} <br/>
                                    <b>Precio gasolina 95:</b> {gasolinera.Precio_gasolina_95_E5} € <br/>
                                    <b>Precio gasolina 98:</b> {gasolinera.Precio_gasolina_98_E5} € <br/>
                                    <b>Precio gasóleo A:</b> {gasolinera.Precio_gasóleo_A} € <br/>
                                </div>
                            </Popup> 
                        </Marker> 
                    
                    ))}
                </MapContainer>
            }
        </Row>
        </Col>
        </Row>
    );
}
 
export default GasolinerasCercanas;
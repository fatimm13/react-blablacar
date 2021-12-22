import { Spinner } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useFetch from "./useFetch";
const GasolinerasCercanas = (datos) => {
    const {posicion} = datos
    const { error, isPending, data: gasolineras } = useFetch("http://127.0.0.1:5000/gasolinera?longitud="+posicion.lng+"&latitud="+posicion.lat)
    var cont = 0;
    const actualiza=()=>{
        cont = cont+1
        return "marcador"+cont
    }
    return (  
        <div >
            { error && <div>{ error }</div> }
            { isPending && <div>BUSCANDO GASOLINERAS <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
            {gasolineras && 
                <MapContainer center={{ lat: posicion.lat, lng: posicion.lng }} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { gasolineras.map(gasolinera => (
                        
                        <Marker key={actualiza()} position={{lat:gasolinera.Latitud,lng:gasolinera.Longitud}} > 
                            <Popup className="Map-Marker">
                                <div>
                                    Dirección: {gasolinera.Dirección} <br/>
                                    Precio gasolina 95: {gasolinera.Precio_gasolina_95_E5} <br/>
                                    Precio_gasolina_98: {gasolinera.Precio_gasolina_98_E5} <br/>
                                    Precio gasóleo A: {gasolinera.Precio_gasóleo_A} <br/>
                                </div>
                            </Popup> 
                        </Marker> 
                    
                    ))}
                </MapContainer>
            }
        </div>
    );
}
 
export default GasolinerasCercanas;
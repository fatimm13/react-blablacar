import { useEffect } from "react";
import { useState } from "react";
import GasolinerasCercanas from "./GasolinerasCercanas";

const LocalizaGasolineras = () => {
    const [posicion,setPosicion]= useState("null")
    useEffect(() => {
        function success(pos) {
            var crd = pos.coords;
            console.log(crd)
            setPosicion({"lng":crd.longitude,"lat":crd.latitude})
        };
            
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };
          
        navigator.geolocation.getCurrentPosition(success, error, {timeout: 10000});
    }, [])
    

    return ( 
        <div>
            {posicion && <GasolinerasCercanas posicion={posicion}/>}
        </div>
    );
}
 
export default LocalizaGasolineras;
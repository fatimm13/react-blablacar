import ReservaList from "./ReservaList";
import useFetch from "./useFetch";
import { Row, Spinner } from "react-bootstrap";


const ReservasListarUrl = (datos) => {
  const {url} = datos
  const { error, isPending, data: reservas } = useFetch(url)

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>LOADING <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
      { reservas && 
        <Row> 
            <h1>Resultados de búsqueda:</h1>
            {reservas.length === 0 && <p>No se han encontrado resultados.</p>}
            <ReservaList reservas={reservas} /> 
        </Row>
        }
      
    </div>
  );
}
 
export default ReservasListarUrl;
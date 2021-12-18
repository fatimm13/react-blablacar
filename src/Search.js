import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Search = () => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
            <FormControl placeholder="Buscar nombre" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <Button variant="outline-secondary" id="button-addon2"> Buscar </Button>
        </InputGroup>
    );
}
 
export default Search;
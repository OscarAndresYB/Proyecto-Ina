import {Form, InputGroup } from "react-bootstrap";

const BuscarReunion = ({searchText,handleSearch})=>{
    return (       
<div className='card-body' style={{paddingBottom:"0px",paddingTop:"0px"}}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><i className="fas fa-search"  /></InputGroup.Text>
                    <Form.Control
                      type='search'
                      placeholder="Buscar.."
                      aria-label="Buscar"
                      aria-describedby="basic-addon1"
                      value={searchText}
                      onChange={handleSearch}
                    />
                    
                </InputGroup>
                </div>

    )
}

export default BuscarReunion;
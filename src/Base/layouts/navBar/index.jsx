import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'


const NavBar = () => {
    return (
        <>
  <Nav className="justify-content-center" activeKey="/home">
   <Nav.Item>
    <Nav.Link><Link to="/departamento"> Departamento</Link></Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link><Link to="/municipio"> Municipios</Link></Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link><Link to="/tipoPersona"> Tipo Persona</Link></Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link><Link to="/tipoCarga"> Tipo De Carga de Vehiculo</Link></Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link><Link to="/persona">Persona</Link></Nav.Link>
    </Nav.Item>
  </Nav>
</>
    )
}

export default NavBar
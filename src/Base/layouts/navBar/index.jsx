
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {Navbar, NavbarToggler, NavbarBrand, Nav, Collapse, NavItem, UncontrolledDropdown, NavLink } from 'reactstrap'


const NavBar = () => {
    const [show, setShow] = useState(false),

    click = () => {

       if(show === true) {
           setShow(false)
       }
       if(show === false) {
        setShow(true)
    }
    }

    useEffect(() => {
        setShow(false)
    },[])

    return (
        <>
   <Navbar
    color="faded"
    light
  >
    <NavbarBrand>
      Menu
    </NavbarBrand>
    <NavbarToggler
      className="me-2"
      onClick={()=>click()}
    />
    <Collapse
      isOpen={show}
      navbar
    >
      <Nav navbar>
        <NavItem>
          <NavLink >
           <Link to="/departamento" onClick={()=>click()}>Departamento</Link>
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink >
           <Link to="/municipio" onClick={()=>click()}>Municipio</Link>
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink >
           <Link to="/tipoPersona" onClick={()=>click()}>Tipo Persona</Link>
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink >
           <Link to="/tipoCarga" onClick={()=>click()}>Tipo de Carga</Link>
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink >
           <Link to="/persona" onClick={()=>click()}>persona</Link>
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink >
           <Link to="/vehiculo" onClick={()=>click()}>Vehiculo</Link>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</>
    
    )
}

export default NavBar
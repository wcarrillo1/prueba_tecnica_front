import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from '../Base/layouts/navBar/index'
import Departamento from '../view/departamento/index'
import Municipio from '../view/municipio/index'
import TipoPersona from '../view/TipoPersona/index'
import TipoCarga from '../view/TipoCarga/index'
import Persona from '../view/persona/index'

const Index = () => {
    return (
    <Router>
        <Nav/>
        <Routes>
        <Route path="/departamento" element={<Departamento/>}/>
        <Route path="/municipio" element={<Municipio/>}/>
        <Route path="/tipoPersona" element={<TipoPersona/>}/>
        <Route path="/tipoCarga" element={<TipoCarga/>}/>
        <Route path="/persona" element={<Persona/>}/>
        </Routes>
        
    </Router>
    )
}

export default Index
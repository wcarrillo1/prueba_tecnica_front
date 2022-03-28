import React, { useEffect, useState } from 'react'
import {GetRout, PostRoute} from '../../Services/Private'
import List from './list'
import { Row, Nav, Container, } from 'react-bootstrap';
import Formulario from './form'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Departamentos = () => {
const   [allData, setAllData] = useState([]),
        [oneData, setOneData] = useState([]),
        [municipios, setMunicipio] = useState([]),
        [tiposPersona, setTipoPersona] = useState([]),
        [modal, setModal] = useState(false),

        toggleModal = (data) => {

            if(data === 1){
                 setModal(true)
                 setOneData(null)
                } 
            if(data === 0){ setModal(false) }
            
        },
        datos = async () =>  {
            const response = await GetRout(`persona/all`)
            setAllData((response.length) ? response : [])
        },
        allMunicipio = async () =>  {
            const response = await GetRout(`departamento/label`)
            setMunicipio((response.length) ? response : [])
        },
        alltipos = async () =>  {
            const response = await GetRout(`tipopersona/label`)
            setTipoPersona((response.length) ? response : [])
        },
        One = async (data) => {
            const response = await PostRoute(`persona/one`, { id : data.id })
            setOneData((response[0]) ? response[0] : [])
            setModal(true)
        },
        StoreUpdate = async (data) => {
            let response = []
            response = await PostRoute(`persona/${!data.id ? 'store' : 'update' }`, data)
            {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
            {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
            datos()
            toggleModal(0)
           
        },
        Actions = async (data) => { 
             const response = await PostRoute(`persona/${ data.estado === 1 ? 'destroy' : 'active'}`, { id : data.id })
             datos()
             {response.response === 1 && NotificationManager.success(response.message, 'Activado', 5000)}
             {response.response !== 1 && NotificationManager.error(response.message, 'Desactivado', 5000)}
             toggleModal(0)
           
        }

        useEffect(() => {
            datos()
            allMunicipio()
            alltipos()
        },[])



return(
        <>
        <Container>

          <div style={{
                marginTop: '10px',
                marginBottom: '8',
                marginRight: '10px',
                marginLeft: '10px',
             }}>
           <h1 className="text-center">Personas</h1>
            <Row>
              <Nav>
                  <Nav.Item className="mx-1">
                      <Formulario
                        StoreUpdate={StoreUpdate}
                        modal={modal}
                        toggleModal={toggleModal}
                        oneData={oneData}
                        municipios={municipios}
                        tiposPersona={tiposPersona}
                        />
                  </Nav.Item>
              </Nav>
            </Row>
            </div>
            <div className="my-3">
            <List
            allData={allData}
            One={One}
            Actions={Actions}
           />  
            </div>
          
            
        <NotificationContainer/>
        </Container>
        
        </>
        
        
        
    )
}

export default Departamentos
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
        [departamentos, setDepartamento] = useState([]),
        [modal, setModal] = useState(false),

        toggleModal = (data) => {

            if(data === 1){
                 setModal(true)
                 setOneData(null)
                } 
            if(data === 0){ setModal(false) }
            
        },
        datos = async () =>  {
            const response = await GetRout(`municipio/all`)
            setAllData((response.length) ? response : [])
        },
        allDepartamento = async () =>  {
            const response = await GetRout(`departamento/label`)
            setDepartamento((response.length) ? response : [])
        },
        One = async (data) => {
            const response = await PostRoute(`municipio/one`, { id : data.id })
            setOneData((response[0]) ? response[0] : [])
            setModal(true)
        },
        StoreUpdate = async (data) => {
            let response = []
            response = await PostRoute(`municipio/${!data.id ? 'store' : 'update' }`, data)
            {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
            {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
            datos()
            toggleModal(0)
           
        },
        Actions = async (data) => { 
             const response = await PostRoute(`municipio/${ data.estado === 1 ? 'destroy' : 'active'}`, { id : data.id })
             datos()
             {response.response === 1 && NotificationManager.success(response.message, 'Activado', 5000)}
             {response.response !== 1 && NotificationManager.error(response.message, 'Desactivado', 5000)}
             toggleModal(0)
           
        }

        useEffect(() => {
            datos()
            allDepartamento()
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
           <h1 className="text-center">Municipios</h1>
            <Row>
              <Nav>
                  <Nav.Item className="mx-1">
                      <Formulario
                        StoreUpdate={StoreUpdate}
                        modal={modal}
                        toggleModal={toggleModal}
                        oneData={oneData}
                        departamentos={departamentos}
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
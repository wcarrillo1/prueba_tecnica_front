import React, { useEffect, useState } from 'react'
import {GetRout, PostRoute} from '../../Services/Private'
import List from './list'
import { Row, Nav, Container, } from 'react-bootstrap';
import Formulario from './form'
import Asignar from './asignar'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Vehiculo = () => {
const   [allData, setAllData] = useState([]),
        [allAsignaciones, setAllAsignaciones] = useState([]),
        [allPersonas, setAllPersonas] = useState([]),
        [oneData, setOneData] = useState([]),
        [tipoCarga, setTipoCarga] = useState([]),
        [modal, setModal] = useState(false),
        [modalAsignar, setModalAsignar] = useState(false),

        toggleModal = (data) => {

            if(data === 1){
                 setModal(true)
                 setOneData(null)
                } 
            if(data === 0){ setModal(false) }
            
        },
        toggleModalAsignar = (data) => {
            console.log(data)
            if(data === 1){
                setModalAsignar(true)
                 
                } 
            if(data === 0){ 
            setModalAsignar(false)

            setOneData(null)
            }
            
        },
        datos = async () =>  {
            const response = await GetRout(`vehiculo/all`)
            setAllData((response.length) ? response : [])
        },
        datosAsignaciones = async () =>  {
            const response = await GetRout(`asignarpersona/all`)
            setAllAsignaciones((response.length) ? response : [])
        },
        alltipos = async () =>  {
            const response = await GetRout(`tipocarga/label`)
            setTipoCarga((response.length) ? response : [])
        },
        allPerson = async () =>  {
            const response = await GetRout(`persona/label`)
            setAllPersonas((response.length) ? response : [])
        },
        One = async (data) => {
            const response = await PostRoute(`vehiculo/one`, { id : data.id })
            setOneData((response[0]) ? response[0] : [])
            setModal(true)
        },
        OneVehiculo = async (data) => {
            const response = await PostRoute(`vehiculo/one`, { id : data.id })
            setOneData((response[0]) ? response[0] : [])
            datosAsignaciones()
            toggleModalAsignar(1)
        },
        StoreUpdate = async (data) => {
            let response = []
            response = await PostRoute(`vehiculo/${!data.id ? 'store' : 'update' }`, data)
            {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
            {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
            datos()
            toggleModal(0)
           
        },
        AsignarEmpleado = async (data) => {
            let response = []
            response = await PostRoute(`asignarpersona/store`, data)
            {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
            {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
            datosAsignaciones()
           
        },
        Delete = async (data) => { 
            console.log(data)
            const response = await PostRoute(`asignarpersona/destroy`, { id : data.id })
            {response.response == 1 && NotificationManager.error(response.message, 'Desactivado', 5000)}
           datosAsignaciones()
       },
        Actions = async (data) => { 
             const response = await PostRoute(`vehiculo/${ data.estado === 1 ? 'destroy' : 'active'}`, { id : data.id })
             datos()
             {response.response === 1 && NotificationManager.success(response.message, 'Activado', 5000)}
             {response.response !== 1 && NotificationManager.error(response.message, 'Desactivado', 5000)}
             toggleModal(0)  
        }

        useEffect(() => {
            datos()
            alltipos()
            allPerson()
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
           <h1 className="text-center">Vehiculos</h1>
            <Row>
              <Nav>
                  <Nav.Item className="mx-1">
                      <Formulario
                        StoreUpdate={StoreUpdate}
                        modal={modal}
                        toggleModal={toggleModal}
                        oneData={oneData}
                        tipoCarga={tipoCarga}
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
            OneVehiculo={OneVehiculo}
           />  
            </div>
            <Asignar
            toggleModalAsignar={toggleModalAsignar}
            modalAsignar={modalAsignar}
            oneData={oneData}
            allPersonas={allPersonas}
            AsignarEmpleado={AsignarEmpleado}
            allAsignaciones={allAsignaciones}
            Delete={Delete}
            
            />  
        
        <NotificationContainer/>
        </Container>
        
        </>
        
        
        
    )
}

export default Vehiculo
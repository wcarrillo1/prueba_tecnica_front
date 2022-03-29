import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import * as Icon from 'react-feather'
import ListEmpleados from './listsEmpleados'

const Formulario = ({AsignarEmpleado, modalAsignar, toggleModalAsignar, oneData, tipoCarga, allPersonas,allAsignaciones, Delete}) => {
    
    const [show, setShow] = useState(false),
        { register, handleSubmit, reset, setValue, control } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            persona : data.persona.value,
            vehiculo : oneData.vehiculo
          }
          AsignarEmpleado(json)
          
        },

      setData = async () => {
          await setValue('tipo_carga', {label: oneData.tipoCarga, value: oneData.idTipoCarga})
          await setValue('placa', oneData.placa)
         
       
      }

       useEffect(() => {
        async function fetchMyAPI() {
          reset()
      }
      fetchMyAPI()
        
      },[modalAsignar])

      useEffect(
        () => {
          console.log("use")
            async function fetchMyAPI() {
                if ( await oneData) {
                  await setData() }
            }
            fetchMyAPI()
        },[oneData]
    )

     
      

    return (
        <>
      
        <Modal size="lg" show={modalAsignar} onHide={()=>toggleModalAsignar(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Asignar Personal</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
          <Row>
          <Col>
          <Form.Label>Tipo De Carga</Form.Label>
           <Form.Group className="mb-3">
           <Controller 
                  name="tipo_carga"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isDisabled={true}
                        isSearchable
                        defaultValue={null}
                        options={tipoCarga}
                        placeholder={"Seleccionar El tipo De Carga"}
                        noOptionsMessage={()=>'sin resultados'}
                        disabled={true}
                      />  
                      )
                    }
                  }
                  rules={{ required: "Este campo es requerido" }}   
                /> 
           </Form.Group>
           </Col>
           <Col>
           <Form.Group className="mb-3">
            <Form.Label>Placa Del Vehiculo</Form.Label>
            <Form.Control
             type="text" 
             readOnly={true}
             name="placa"
             placeholder="Ingresa La Placa del Vehiculo"
             { ...register("placa",{
                    required: true
             })} />
            </Form.Group>
            </Col>
         </Row>
         <Row>
         <Col>
          <Form.Label>Empleado</Form.Label>
           <Form.Group className="mb-3">
           <Controller 
                  name="persona"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isSearchable
                        defaultValue={null}
                        options={allPersonas}
                        placeholder={"Seleccionar El Empleado"}
                        noOptionsMessage={()=>'sin resultados'}
                        disabled={true}
                      />  
                      )
                    }
                  }
                  rules={{ required: "Este campo es requerido" }}   
                /> 
           </Form.Group>
           </Col>
           <Col>
           <Button variant="info" type="submit" className="my-4">
           <Icon.Plus className="my-1" size={15} />  
            </Button></Col>
         </Row>
         <br/>
         <Row>
           <ListEmpleados
            allAsignaciones={allAsignaciones}
             Delete={Delete}
            />
           
         </Row>
            </Modal.Body>
           
          <Modal.Footer>
            <Button variant="danger" onClick={()=>toggleModalAsignar(0)}>
              Salir
            </Button>
            
          </Modal.Footer>
           </Form>
        </Modal>
      
      </>
    )

}

export default Formulario
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

const Formulario = ({StoreUpdate, modal, toggleModal, oneData, tipoCarga}) => {
    
    const [show, setShow] = useState(false),
        { register, handleSubmit, reset, setValue, control } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            id : oneData ? oneData.id : null,
            tipo_carga : data.tipo_carga.value,
            placa : data.placa,
            capacidad : data.capacidad,
            consumo_combustible : data.consumo_combustible,
            costo_depreciacion : data.costo_depreciacion
          }
          StoreUpdate(json)
          setShow(false)
          reset()
        },

        setData = async () => {
         { oneData.id && await setValue('tipo_carga', {label: oneData.tipoCarga, value: oneData.idTipoCarga})}
          await setValue('placa', oneData.placa)
          await setValue('capacidad', oneData.capacidad)
          await setValue('costo_depreciacion', oneData.costo_depreciacion)
          await setValue('consumo_combustible', oneData.consumo_combustible)
         
       
      }
      useEffect(() => {
        async function fetchMyAPI() {
          reset()
      }
      fetchMyAPI()
        
      },[modal])
  
      useEffect(
          () => {
              async function fetchMyAPI() {
                  if ( await oneData) {
                    await setData() }
              }
              fetchMyAPI()
          },[oneData]
      )



    return (
        <>
        <Button variant="primary" onClick={()=>toggleModal(1)}>
        Nuevo Vehiculo
        </Button>
      
        <Modal size="lg" show={modal} onHide={()=>toggleModal(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Nuevo Vehiculo</Modal.Title>
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
                        isSearchable
                        defaultValue={null}
                        options={tipoCarga}
                        placeholder={"Seleccionar El tipo De Carga"}
                        noOptionsMessage={()=>'sin resultados'}
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
           <Form.Group className="mb-3">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
             type="text" 
             name="capacidad"
             placeholder="Ingresa La Capacidad"
             { ...register("capacidad",{
                    required: true
             })} />
            </Form.Group>
            </Col>
            <Col>
           <Form.Group className="mb-3">
            <Form.Label>Consumo De Combustible</Form.Label>
            <Form.Control
             type="text" 
             name="consumo_combustible"
             placeholder="Ingresa el Comsumo"
             { ...register("consumo_combustible",{
                    required: true
             })} />
            </Form.Group>
            </Col>
            <Col>
           <Form.Group className="mb-3">
            <Form.Label>Costo depreciacion</Form.Label>
            <Form.Control
             type="text" 
             name="costo_depreciacion"
             placeholder="Depreciacion del Vehiculo"
             { ...register("costo_depreciacion",{
                    required: true
             })} />
            </Form.Group>
            </Col>
         </Row>
            </Modal.Body>
           
          <Modal.Footer>
            <Button variant="danger" onClick={()=>toggleModal(0)}>
              Salir
            </Button>
            {oneData ? <Button variant="warning" type="submit">Actualizar</Button> : <Button variant="success" type="submit">Guardar</Button>   }
          </Modal.Footer>
           </Form>
        </Modal>
      
      </>
    )

}

export default Formulario
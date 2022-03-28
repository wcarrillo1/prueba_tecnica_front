import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

const Formulario = ({StoreUpdate, modal, toggleModal, oneData, municipios, tiposPersona}) => {
    
    const { register, handleSubmit, reset, setValue, control } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            id : oneData ? oneData.id : null,
            nombres : data.nombres,
            apellidos : data.apellidos,
            municipio : data.municipio.value,
            direccion : data.direccion,
            nit : data.nit,
            tipo_persona : data.tipo_persona.value
  
          }
          StoreUpdate(json)
          reset()
        },

        setData = async () => {
          await setValue('nombres', oneData.nombres)
          await setValue('apellidos', oneData.apellidos)
          await setValue('direccion', oneData.direccion)
          await setValue('nit', oneData.nit)
       
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
        Nuevo Persona
        </Button>
      
        <Modal size="lg" show={modal} onHide={()=>toggleModal(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Nueva Persona</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
          <Row>
           <Col>
           <Form.Group className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
             type="text" 
             name="nombres"
             placeholder="Ingresa los nombres"
             { ...register("nombres",{
                    required: true
             })} />
            </Form.Group>
            </Col>
            <Col>
           <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
             type="text" 
             name="apellidos"
             placeholder="Ingresa los apellidos"
             { ...register("apellidos",{
                    required: true
             })} />
            </Form.Group>
            </Col>
           
         </Row>
          <Row>
          <Col>
           <Form.Group className="mb-3">
           <Form.Label>Municipio</Form.Label>
           <Controller 
                  name="municipio"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isSearchable
                        defaultValue={null}
                        options={municipios}
                        placeholder={"Seleccionar municipio"}
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
            <Form.Label>Direccion</Form.Label>
            <Form.Control
             as="textarea"
             type="text" 
             name="direccion"
             placeholder="Ingresa los nombres"
             { ...register("direccion",{
                    required: true
             })} />
            </Form.Group>
            </Col>
            </Row> 
          <Row>
           <Col>
           <Form.Group className="mb-3">
            <Form.Label>Nit</Form.Label>
            <Form.Control
             type="text" 
             name="nit"
             placeholder="Ingresa El nit"
             { ...register("nit",{
                    required: true
             })} />
            </Form.Group>
            </Col>
            <Col>
           <Form.Group className="mb-3">
           <Form.Label>Tipo De Persona</Form.Label>
           <Controller 
                  name="tipo_persona"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isSearchable
                        defaultValue={null}
                        options={tiposPersona}
                        placeholder={"Seleccionar tipo persona"}
                        noOptionsMessage={()=>'sin resultados'}
                      />  
                      )
                    }
                  }
                  rules={{ required: "Este campo es requerido" }}   
                /> 
           </Form.Group>
           </Col>
         </Row>
            </Modal.Body>
           
          <Modal.Footer>
            <Button variant="danger" onClick={()=>toggleModal(0)}>
              Salir
            </Button>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
           </Form>
        </Modal>
      
      </>
    )

}

export default Formulario
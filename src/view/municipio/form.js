import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

const Formulario = ({StoreUpdate, modal, toggleModal, oneData, departamentos}) => {
    
    const [show, setShow] = useState(false),
        { register, handleSubmit, reset, setValue, control } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            id : oneData ? oneData.id : null,
            nombre : data.nombre,
            departamento : data.departamento.value
          }
          StoreUpdate(json)
          setShow(false)
          reset()
        },

        setData = async () => {
          await setValue('nombre', oneData.nombre)
         {oneData.id && await setValue('departamento', {label: oneData.departamento, value: oneData.idDepartamento})} 
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
        Nuevo Municipio
        </Button>
      
        <Modal size="md" show={modal} onHide={()=>toggleModal(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Nuevo Municipio</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
          <Row>
          <Col>
           <Form.Group className="mb-3">
           <Controller 
                  name="departamento"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isSearchable
                        
                        options={departamentos}
                        placeholder={"Seleccionar Departamento"}
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
          <Row>
           <Col>
           <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
             type="text" 
             name="nombre"
             placeholder="Ingresa El Nombre del Municipio"
             { ...register("nombre",{
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
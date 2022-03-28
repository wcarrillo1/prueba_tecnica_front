import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Formulario = ({StoreUpdate, modal, toggleModal, oneData, wared}) => {
    
    const [show, setShow] = useState(false),
        { register, handleSubmit, reset, setValue } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            id : oneData ? oneData.id : null,
            nombre : data.nombre,
          }
          StoreUpdate(json)
          setShow(false)
          reset()
        },

        setData = async () => {
          await setValue('nombre', oneData.nombre)
         
       
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
        Nuevo Departamento
        </Button>
      
        <Modal size="md" show={modal} onHide={()=>toggleModal(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Nuevo Departamento</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
         <Row>
           <Col>
           <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
             type="text" 
             name="nombre"
             placeholder="Ingresa El Nombre del Departamento"
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
import React, { useEffect, useState } from 'react'
import {GetRout, PostRoute} from '../../Services/Private'
import List from './list'
import { Row, Nav, Card, Container, ListGroupItem, ListGroup } from 'react-bootstrap';
import Formulario from './form'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Departamentos = () => {


return(
        <>
        <Container>

          <div style={{
                marginTop: '10px',
                marginBottom: '8',
                marginRight: '10px',
                marginLeft: '10px',
             }}>
           <h1 className="text-center">Departamentos</h1>
           
            </div>
            
        <NotificationContainer/>
        </Container>
        
        </>
        
        
        
    )
}

export default Departamentos
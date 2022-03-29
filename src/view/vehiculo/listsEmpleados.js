import React, { Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Input, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu  } from 'reactstrap'
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { CustomText, EstadoLista } from  '../../Utility/CustomList/index'

const List = ({allAsignaciones, Actions, Delete}) => {
  const  Columns = [
        {
          name: 'Persona',
          column: 'nombrePersona',
          sortable: true,
          center: true,
          cell: row => CustomText(row['nombrePersona'])
        },
        {
          name: 'Estado',
          column: 'estado',
          sortable: true,
          center: true,
          width:'200px',
          cell: row => <EstadoLista row={row} />
        },
        {
          name: 'Acciones',
          column: 'id',
          sortable: true,
          center: true,
          cell: row => (
            <UncontrolledButtonDropdown>
              <DropdownItem onClick={() => Delete(row) }>
              <Icon.Trash className="mr-2" size={15} />  
              </DropdownItem>
              
           
          </UncontrolledButtonDropdown>
          )
        }
    ]

    return(
        <div className="list">
            <Row>
            <Container>
            <DataTable
                // dense
                noHeader
                highlightOnHover
                pagination
                data={allAsignaciones }          
                columns={Columns}
                className='table-responsive'
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                paginationComponentOptions={
                    {
                    rowsPerPageText: '',
                    rangeSeparatorText:''
                    }
                }
                noDataComponent='Sin Registros'
            />
        </Container>
        </Row> 
        </div>
       
        
        
        
    )
}

export default List
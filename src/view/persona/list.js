import React, { Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Input, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu  } from 'reactstrap'
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { CustomText, EstadoLista } from  '../../Utility/CustomList/index'

const List = ({allData, Actions, One}) => {
  const  Columns = [
        {
            name: 'Nombres',
            column: 'nombres',
            sortable: true,
            center: true,
            cell: row => CustomText(row['nombres'])
          },
          {
            name: 'Apellidos',
            column: 'apellidos',
            sortable: true,
            center: true,
            cell: row => CustomText(row['apellidos'])
          },
          {
            name: 'Nit',
            column: 'nit',
            sortable: true,
            center: true,
            cell: row => CustomText(row['nit'])
          },
          {
            name: 'Direccion',
            column: 'direccion',
            sortable: true,
            center: true,
            cell: row => CustomText(row['direccion'])
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
              
              <DropdownItem onClick={() => One(row, 3)}>
                <Icon.Edit className="mr-2" size={15} />
              </DropdownItem>
              <DropdownItem onClick={() => Actions(row) }>
              <Icon.Check className="mr-2" size={15} />  
               
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
                data={allData }          
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
import React, { Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Input, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu  } from 'reactstrap'
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { CustomText, EstadoLista, EstadoVehiculo } from  '../../Utility/CustomList/index'

const List = ({allData, Actions, One, OneVehiculo}) => {
  const  Columns = [
        {
          name: 'Placa',
          column: 'placa',
          sortable: true,
          center: true,
          cell: row => CustomText(row['placa'])
        },
        {
            name: 'Comsumo Combustible',
            column: 'consumo_combustible',
            sortable: true,
            center: true,
            cell: row => CustomText(row['consumo_combustible'])
        },
        {
            name: 'Costo Depreciacion',
            column: 'costo_depreciacion',
            sortable: true,
            center: true,
            cell: row => CustomText(row['costo_depreciacion'])
        },
        {
          name: 'Estado',
          column: 'estado',
          sortable: true,
          center: true,
          width:'200px',
          cell: row => <EstadoVehiculo row={row} />
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
              <DropdownItem onClick={() => OneVehiculo(row) }>
              <Icon.Plus className="mr-2" size={15} />  
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
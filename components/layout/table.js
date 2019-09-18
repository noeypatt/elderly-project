import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Table extends React.Component {

    static defaultProps = {
        data: []
    }

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleClick = (rowKey) => {
        alert(this.refs.table.getPageByRowKey(rowKey));
    }

    handleBtnClick = () => {
        if (order === 'desc') {
          this.refs.table.handleSort('asc', 'name');
          order = 'asc';
        } else {
          this.refs.table.handleSort('desc', 'name');
          order = 'desc';
        }
      }



    render() {
        const { data } = this.props
        return (
            <div className="warp-table">
                <div className="table">
                    <BootstrapTable
                        ref='table'
                        data={data}
                        dataSort={ true }
                        pagination={true}
                        search={true}
                    >
                        <TableHeaderColumn dataField="ลำดับที่" isKey={true}>ลำดับที่</TableHeaderColumn>
                        <TableHeaderColumn dataField="คำนำหน้า">คำนำหน้า</TableHeaderColumn>
                        <TableHeaderColumn dataField="ชื่อ">ชื่อ</TableHeaderColumn>
                        <TableHeaderColumn dataField="นามสกุล">นามสกุล</TableHeaderColumn>
                        <TableHeaderColumn dataField="อายุ">อายุ (ปี)</TableHeaderColumn>
                    </BootstrapTable>



                </div>


            </div>
        )
    }
}
export default Table;
import React, { useState } from 'react';
import {Radio, Divider,Table } from 'antd'

const TableComponent = (props) => {
    const {selectionType = 'checkbox', data = [] , columns = []} = props
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
        <div>
            <Table  
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
    );
};

export default TableComponent;
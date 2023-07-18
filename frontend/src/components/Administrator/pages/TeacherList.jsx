import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';
import './TeacherList.css';
const data = [
  {
    key: '1',
    Id:"T01",
    name: 'M.Perera',
    age: 32,
    address: 'No 03,Flower road ,Balangode',
    
  },
  {
    key: '2',
    Id:"T02",
    name: 'A.Nayana',
    age: 42,
    address: 'Balangoda No. 1 Lake Park',
  },
  {
    key: '3',
    Id:"T03",
    name: 'A.Prasanna',
    age: 25,
    address: 'No 03,Peradeniya',
  },
  {
    key: '4',
    Id:"T04",
    name: 'A.M.Amanda',
    age: 32,
    address: 'No 05,Base road,Balangoda',
  },
];
const App = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
    <Table
    columns={columns}
    dataSource={data}
    bordered
    
  />
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
      
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
     
    
    },
  ];
  return (
    
    <>
     <h3 className="mb-4 title">Teacher List</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
       
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default App;
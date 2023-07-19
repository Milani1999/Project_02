import React from 'react';
import { Table, Divider } from 'antd';
import {AiFillEdit } from "react-icons/ai";
import './Subject.css';
import { Button, Space } from 'antd';
const columns = [
  {
    title: 'Id',
    dataIndex: 'Id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
 
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href='#'><AiFillEdit/></a>
  },
];
const data = [
  {
    key: '1',
    Id:"SUB01",
    name: 'Mathamatics',
  },
  {
    key: '2',
    Id:"SUB02",
    name: 'Science',
  },
  {
    key: '3',
    Id:"SUB03",
    name: 'English',
  },
];
const App = () => (
  <>
    <Divider>Subjects</Divider>
    <Space>
      <Button type="primary">Add Subject</Button>
      
   
    </Space>
    <Table columns={columns} dataSource={data} size="middle" />
  
  </>
);
export default App;
import React from "react";
import {FcCollaboration,FcBusinesswoman,FcKindle } from "react-icons/fc";
import { Column } from "@ant-design/plots";
import { Progress, Space } from 'antd';
import './Dashboard.css';

const Dashboard = () => {
  const data = [
    {
      name: 'Girls',
    Class: '01',
    students: 18,
    },
    {
      name: 'Girls',
      Class: '02',
    students: 10,
    },
    {
      name: 'Girls',
    Class: '03',
    students: 8,
    },
    {
      name: 'Girls',
      Class: '04',
    students: 13,
    },
    {
      name: 'Girls',
      Class: '05',
      students: 10,
      },
      {
        name: 'Girls',
        Class: '06',
      students: 20,
      },
    {
      name: 'Girls',
      Class: '07',
      students: 18,
      },
      {
        name: 'Girls',
        Class: '08',
      students: 10,
      },
      {
        name: 'Girls',
        Class: '09',
      students: 11,
      },
      {
        name: 'Girls',
        Class: '10',
      students: 10,
      },
      {
        name: 'Girls',
        Class: '11',
      students: 25,
      },
      {
        name: 'Boys',
      Class: '01',
      students: 8,
      },
      {
        name: 'Boys',
        Class: '02',
      students: 14,
      },
      {
        name: 'Boys',
      Class: '03',
      students: 18,
      },
      {
        name: 'Boys',
        Class: '04',
      students: 10,
      },
      {
        name: 'Boys',
        Class: '05',
        students: 14,
        },
        {
          name: 'Boys',
          Class: '06',
        students: 15,
        },
      {
        name: 'Boys',
        Class: '07',
        students: 8,
        },
        {
          name: 'Boys',
          Class: '08',
        students: 16,
        },
        {
          name: 'Boys',
          Class: '09',
        students: 6,
        },
        {
          name: 'Boys',
          Class: '10',
        students: 15,
        },
        {
          name: 'Boys',
          Class: '11',
        students: 15,
        },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'Class',
    yField: 'students',
    seriesField: 'name',

   
   
    label: {
      
      position: 'middle',
      
      layout: [
      
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        }, 
        {
          type: 'adjust-color',
        },
      ],
    },
  };



  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            
            <h3 className="desc">Students</h3>
            <h4 className="mb-0 sub-title">400</h4>
          </div>
         
            <h6 className="stu">
              <FcCollaboration /> 
            </h6>
            
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <h3 className="desc">Teachers</h3>
            <h4 className="mb-0 sub-title">20</h4>
          </div>
          
            <h6 className="red">
              <FcBusinesswoman /> 
            </h6>
           
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <h3 className="desc">Classes</h3>
            <h4 className="mb-0 sub-title">13</h4>
          </div>
          
            <h6 className="green">
              <FcKindle /> 
            </h6>
          
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <h3 className="desc">Today Attendence</h3>
            
          
          
          <Space wrap>
    <h4>Teachers</h4><Progress type="dashboard" percent={75} />
  <br></br>  <h4>Students</h4><Progress type="dashboard" percent={20} gapDegree={30} />
  </Space>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">No of Students in Each class</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
     
    </div>
    
  );
};

export default Dashboard;

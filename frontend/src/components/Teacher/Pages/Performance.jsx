import React, { useState } from 'react';
import { Select, Row, Col, Card } from 'antd';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './Performance.css';
const { Option } = Select;

const Performance = () => {
  const classes = ['Class 1', 'Class 2', 'Class 3'];
  const subjects = ['Mathematics', 'Science', 'History'];

  
  
  const marksData = {
    'Class 1': {
      Mathematics: [80, 92, 74, 45, 50, 60, 78, 88, 92, 100],
      Science: [85, 78, 92, 40, 60, 88, 72, 65, 95, 50],
      History: [55, 68, 80, 30, 75, 92, 60, 85, 48, 58],
    },
    'Class 2': {
      Mathematics: [75, 88, 92, 60, 55, 75, 85, 78, 90, 70],
      Science: [80, 75, 88, 60, 40, 58, 68, 72, 82, 55],
      History: [70, 82, 65, 30, 88, 78, 92, 60, 55, 75],
    },
    'Class 3': {
      Mathematics: [60, 72, 65, 30, 85, 78, 92, 60, 55, 75],
      Science: [70, 82, 65, 30, 88, 78, 92, 60, 55, 75],
      History: [75, 88, 92, 60, 55, 75, 85, 78, 90, 70],
    },
  };

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  };

  const getMarkRangeDistribution = (subjectMarks) => {
    const markRanges = [0, 35, 45, 55, 65, 75, 100];
    const distribution = markRanges.map((range, index) => {
      const nextRange = markRanges[index + 1];
      const studentsInRange = subjectMarks.filter((mark) => mark >= range && mark < nextRange).length;
  
      //  greater than or equal to the last range's lower bound
      if (index === markRanges.length - 2) {
        const lastRange = `${markRanges[index]} - ${markRanges[index + 1] - 1}`;
        const studentsInLastRange = subjectMarks.filter((mark) => mark >= markRanges[index]).length;
        return {
          range: lastRange,
          students: studentsInLastRange,
        };
      }
  
      //  upper bound is 100
      if (index === markRanges.length - 1) {
        const lastRange = `${markRanges[index]} - ${markRanges[index + 1] - 1}`;
        const studentsInLastRange = subjectMarks.filter((mark) => mark >= markRanges[index]).length;
        return {
          range: lastRange,
          students: studentsInLastRange,
        };
      }
  
      return {
        range: `${range} - ${nextRange - 1}`,
        students: studentsInRange,
      };
    });
    return distribution;
  };
  
  

  const isDataSelected = selectedClass && selectedSubject;

  let pieChartData = [];
  let barChartData = [];
  let totalStudents = 0;
  let totalMarks = 0;

  if (selectedClass && selectedSubject) {
    const subjectMarks = marksData[selectedClass][selectedSubject];
    const markRangeDistribution = getMarkRangeDistribution(subjectMarks);

    // Calculate the total number of students and the total marks for the selected subject
    markRangeDistribution.forEach((item) => {
      totalStudents += item.students;
      totalMarks += item.students * (parseInt(item.range.split(' ')[2]) + parseInt(item.range.split(' ')[0])) / 2;
    });

    // Create data for both pie chart and bar chart
    pieChartData = markRangeDistribution.map((item) => ({
      name: item.range,
      value: item.students,
      percentage: ((item.students / totalStudents) * 100).toFixed(2),
    }));

    barChartData = markRangeDistribution.map((item) => ({
      range: item.range,
      students: item.students,
      percentage: ((item.students / totalStudents) * 100).toFixed(2),
    }));
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#9966FF', '#FF9F40'];

  return (
    <div>
      <h1>Student Performance</h1>
      <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
          <Card>
            <h3>Select Class</h3>
            <Select style={{ width: '100%' }} onChange={handleClassChange}>
              {classes.map((className) => (
                <Option key={className} value={className}>
                  {className}
                </Option>
              ))}
            </Select>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <h3>Select Subject</h3>
            <Select style={{ width: '100%' }} onChange={handleSubjectChange}>
              {subjects.map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>
      {isDataSelected && (
        <Row>
        <Col xs={24} md={12}>
            <Card className='chart'>
              <h2>{selectedClass} - {selectedSubject}</h2>
              <PieChart width={500} height={400}>
                <Pie
                  data={pieChartData}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#000"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {pieChartData[index].value !== 0 ? `${pieChartData[index].name} (${pieChartData[index].percentage}%)` : ''}
                      </text>
                    );
                  }}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className='chart'>
              <h3>Number of Students in Each Range for {selectedSubject}</h3>
              <BarChart width={520} height={400} data={barChartData}>
                <XAxis dataKey="range" interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#8884d8" />
              </BarChart>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Performance;

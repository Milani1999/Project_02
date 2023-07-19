import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,

  Radio,
  Select,
 
} from 'antd';
const App = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { TextArea } = Input;
  return (
     <div className="  bg-white  roudned-3">
   <div>
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    > <h3 className="mb-4 title">Add Student</h3>
      <Form.Item 
      label="First name"> <Input /></Form.Item>
       <Form.Item 
      label="Last name"> <Input /></Form.Item>
      <Form.Item label="Address">
      <TextArea rows={2} /> </Form.Item>
      <Form.Item label="Gender">
          <Radio.Group>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

         
       
      <Form.Item label="Select Grade">
        <Select>
          <Select.Option value="demo">01</Select.Option>
          <Select.Option value="demo">02</Select.Option>
          <Select.Option value="demo">03</Select.Option>
          <Select.Option value="demo">04</Select.Option>
          <Select.Option value="demo">05</Select.Option>
          <Select.Option value="demo">06</Select.Option>
          <Select.Option value="demo">07</Select.Option>
          <Select.Option value="demo">08</Select.Option>
          <Select.Option value="demo">09</Select.Option>
          <Select.Option value="demo">10</Select.Option>
          <Select.Option value="demo">11</Select.Option>
        </Select>
      </Form.Item>
      
     
      
      <Form.Item label="Date of Birth :">
        <DatePicker />
      </Form.Item>
      <Form.Item 
      label="mother name"> <Input /></Form.Item>
       <Form.Item 
      label="Father name"> <Input /></Form.Item>
     
      
      <Form.Item label="">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
   
    </Form>
    </div></div>
  );
};
export default App;
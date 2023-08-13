import React from 'react';
import { ChatEngine } from 'react-chat-engine'
import '../../../assets/Style/supportAssist.css';

const SupportAdmin = () => {
  return (
    <div className='supportAssist'>
    <ChatEngine 
      projectID={process.env.REACT_APP_CE_PROJECT_ID}
      userName='Admin'
      userSecret='Admin@123'
      height='calc(100vh - 80px)'
      
    />
    </div>
  );
}

export default SupportAdmin;

import React, {useState, useEffect} from "react";

 import { ChatEngineWrapper, Socket,ChatFeed} from "react-chat-engine";

 const ChatEngine = props => {
    const [showChat,setShowChat] = useState(false)

    useEffect (() => {
        if (props.visible){
            setTimeout( ()=> {
                setShowChat(true)
            }, 500)
        }  
    })
    return (
        <div
            className="transition-5"
            style={{
                    height: props.visible ? '100%' : '0',
                    zIndex: props.visible ? '100' : '0',     
                    width: '100%',
                    backgroundColor: 'white'
            }}
        >
            {
                showChat && 
                <ChatEngineWrapper>
                    <Socket
                        offset={6}
                        projectID={process.env.REACT_APP_CE_PROJECT_ID}
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />

                    <ChatFeed activeChat={props.chat.id}/>
                </ChatEngineWrapper>
            }

        </div>
    )
 }

 export default ChatEngine
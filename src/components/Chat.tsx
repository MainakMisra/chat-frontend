import { useNavigate } from 'react-router';
import '../common/assets/css/chat.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './protectedRoutes/ProtectedSignIn.tsx';
import { Message } from './templates/user.tsx';

const parseMessage = (data: any): Message => {
  
    return {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      message_id: data.message_id,
      content: data.content,
      created_at: data.created_at,
    };
  };

export const Chat = () => {
    const navigate = useNavigate();

  const context = useContext(UserContext);
  
  const [clientId, setClientId] = useState(context?.user?.id);

  const [websckt, setWebsckt] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    const url = `ws://${process.env.REACT_APP_CHAT_BACKEND_HOST}:${process.env.REACT_APP_CHAT_BACKEND_PORT}/ws/${clientId}`;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      console.log('websocket connected');
    };

    // recieve message every start page
    ws.onmessage = (e) => {
      const receivedData = JSON.parse(JSON.parse(e.data));
      const message = parseMessage(receivedData);
      setMessages([...messages, message]);
   
    };

    setWebsckt(ws);
    //clean up function when we close page
    // return () => ws.close();

  }, [clientId]);


  const sendMessage = () => {
    if (websckt) { 
    websckt.send("message");
      websckt.onmessage = (e) => {
      const receivedData = JSON.parse(JSON.parse(e.data));
      const message = parseMessage(receivedData);
      setMessages([...messages, message]);
    };
    setMessage([]);
    }

  };



   return (
      <div className='main_div'>
        <nav className="navbar">
        <div className="container">
        <div className="logo">
        <h1>Welcome, {context?.user?.first_name}</h1>
        </div>
        <div className="nav-elements">
        <ul>
        <li>
        <button>LOGOUT</button>
        </li>
        </ul>
        </div>
        </div>
       </nav>
           
    <div className="main-container">
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.id === clientId) {
              return (
                <div key={index} className="my-message-container">
                <div className="my-message">
                  <p className="client">client id : {value.id}</p>
                  <p className="message">{value.content}</p>
                </div>
              </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id : {clientId}</p>
                    <p className="message">{value.content}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
        <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
          ></input>
          <button className="submit-chat"  onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
      </div>
   );
};

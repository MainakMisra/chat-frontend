import { useNavigate } from 'react-router';
import '../common/assets/css/chat.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './protectedRoutes/ProtectedSignIn.tsx';
import { Message } from './templates/user.tsx';
import { logout } from '../common/api/user.tsx';
import { formatDateTime } from './utils/helperFunctions.tsx';

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
  const url = `ws://${process.env.REACT_APP_CHAT_BACKEND_HOST}:${process.env.REACT_APP_CHAT_BACKEND_PORT}/ws/${clientId}`;
  
  const [websckt, setWebsckt] = useState<WebSocket | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    if (!clientId) return;
    const ws = new WebSocket(url);
    setWebsckt(ws);
    ws.onopen = (event) => {
      console.log('websocket connected');
    };

    ws.onmessage = (e) => {
      const receivedData = JSON.parse(JSON.parse(e.data));
      const message = parseMessage(receivedData);
    
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((msg) => msg.message_id === message.message_id);
        if (!messageExists) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

  }, [clientId]);


  const sendMessage = () => {
    if (websckt) { 
      let new_msg = (document.getElementById('new_message') as HTMLInputElement);
      if (new_msg.value !== '') { 
        websckt.send(new_msg.value);
        new_msg.value = '';
      }
    }
  };


  const user_logout = (): any => {
  logout().then((response) => {
  if (response.status === 200) {
  navigate('/');

  } else {
  console.error(response);
  }
  });
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
        <button className="logout_btn" onClick={user_logout}>LOGOUT</button>
        </li>
        </ul>
        </div>
        </div>
       </nav>
       

           
    <div className="main-container">
      <div className="chat-container">
        <div className="chat">
             {messages.map((value, index) => {
            const { date, time } = formatDateTime(value.created_at);
            if (value.id === clientId) {
              return (
                <div key={index} className="my-message-container">
                <div className="my-message">
                    <p className="client">User: {`${value.first_name} ${value.last_name}`}</p>
                    <p className="client">Timestamp: {date} {time}</p>
                  <p className="message msg1">{value.content}</p>
                </div>
              </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">User: {`${value.first_name} ${value.last_name}`}</p>
                    <p className="client">Timestamp: {date} {time}</p>
                    <p className="message msg2">{value.content}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
             <input
               id='new_message'
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

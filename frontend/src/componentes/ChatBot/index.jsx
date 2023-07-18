import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { analyze } from "../../utils/analyze";
import { Button } from "react-bootstrap";
import styles from "./ChatBot.module.css";
import ChatMessage from "../ChatMessage";
import { toast } from "react-toastify";

export default function ChatBot({username}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    if (username) {
      setMessages([{ message: `Olá, ${username}. Como posso te ajudar?` }]);
    }
  }, [username]);

  const handleSend = async() => {
if(!username) {
  toast.error("Por favor, faça login");
  return
}

const userMessage = { message: text, user: true };
const updatedMessages = [...messages, userMessage];
setMessages(updatedMessages);
setText('');

try {
  const response = await analyze(text); 
  const botMessage = { message: response, user: false };
  setMessages([...updatedMessages, botMessage]);
} catch (error) {
  console.error(error);
}

    setTimeout(() => {
      document.querySelectorAll("#copyright").scrollIntoView();
    }, 1);
  };

  return (
    <div className={styles.chatbot}>
      {/* <Header /> */}
      <div className={styles.logo}>
        <img src="/bot-assistent.png" alt="bot logo" height={120} width={120} />
        <h2 className="title">ChatBot</h2>
      </div>
      <div className={styles.chat_message}>
      {messages.length > 0 &&
          messages.map((data, index) => <ChatMessage
    message={data.message}
    user={data.user}
    options={data.options}
    messages={messages}
    key={index}
  />
          )}
      <div className="d-flex mt-2">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="primary" className="ms-2" onClick={handleSend}>
          Send
        </Button>
      </div>
      <div id='copyright' className='mt-3'>Copyright reserved IgnacioFabianaDev.</div>
      </div>
    </div>
  );
}

ChatBot.propTypes = {
  username: PropTypes.func.isRequired,
};
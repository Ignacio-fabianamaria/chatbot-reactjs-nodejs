import { useState } from "react";
import { analyze } from "../../utils/analyze";
import { Button } from "react-bootstrap";
import styles from "./ChatBot.module.css";
import ChatMessage from "../ChatMessage";

export default function ChatBot() {
  const initialGreeting = [{ message: "Olá, Como posso te ajudar" }];
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(initialGreeting);

  const handleSend = () => {
    let list = [...messages, { message: text, user: true }];
    if (list.length > 2) {
      const reply = analyze(text);
      list = [...list, { message: reply }];
    } else {
      list = [
        ...list,
        { message: `Olá, ${text}` },
        { message: "Como poso te ajudar?" },
      ];
    }
    setMessages(list);
    setText('');
    setTimeout(() => {
      document.querySelectorAll("#copyright").scrollIntoView();
    }, 1);
  };

  return (
    <div className={styles.chatbot}>
      <header>
        <img src="/bot-assistent.png" alt="bot logo" height={200} width={200} />
        <h2 className="title">ChatBot</h2>
      </header>
      <div className={styles.chat_message}>
      {messages.length > 0 &&
          messages.map((data, index) => <ChatMessage
    message={data.message}
    user={data.user}
    options={data.options} // Adicione a prop "options"
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

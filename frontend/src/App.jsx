import ChatBot from "./componentes/ChatBot";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import Header from "./componentes/Header";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  const handleLoginSuccess = (username) => {
    setUsername(username);
  };
  return (
    <>
      <Header onLoginSuccess={handleLoginSuccess} />
      <ChatBot username={username}/>
    </>
  );
}

export default App;

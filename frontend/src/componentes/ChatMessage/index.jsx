import PropTypes from "prop-types";
import styles from "./ChatMessage.module.css";
import { ChatDots, Person } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
// import { saveChatToCSV } from "../../utils/saveChatToCSV";
import { requestConversation } from "../../services/requests";
import { ToastContainer, toast } from "react-toastify";
import { isAxiosError } from "axios";


export default function ChatMessage(props) {
  const [buttonResult, setButtonResult] = useState("");
  const [chatData, setChatData] = useState([]);

  const handleButtonClick = async (buttonId) => {
    try {
      let result;
      if (buttonId === "solicitar_emprestimo") {
        result = "Você solicitou um empréstimo";
        setButtonResult(result);
      } else if (buttonId === "condicoes_emprestimo") {
        result = "Você solicitou condições de empréstimo";
        setButtonResult(result);
      } else if (buttonId === "ajuda") {
        result = "Você solicitou ajuda";
        setButtonResult(result);
      } else if (buttonId === "nao") {
        result = "Em que posso te ajudar?";
        setButtonResult(result);
      } else if (buttonId === "sim") {
        result = "Obrigado por nos contactar. Volte sempre!";
        setButtonResult(result);
        
      }
      const updatedChatData = [
        ...chatData,
        { user: props.user, message: props.messages },
      ];
      setChatData(updatedChatData);
      console.log("🚀 ~ file: index.jsx:40 ~ handleButtonClick ~ updatedChatData:", updatedChatData)

      await requestConversation('/conversation', { conversationData: updatedChatData });
      toast.success('Chat cadastrado com sucesso');


      const buttonParent = document.getElementById(buttonId).parentNode;
      buttonParent.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log('Error:', error); 
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log('Toast error'); 
      } else {
        toast.error(error.message);
        console.log('Toast error');
      }
    }
  };

  useEffect(() => {
    console.log("buttonResult atualizado:", buttonResult);
  }, [buttonResult]);

  return (
    <div className={`d-flex ${props.user ? "justify-content-end" : ""}`}>
      {props.user ? (
        <span className={styles.message_right}>
          <Person className={styles.message_icon} />
          <span className={styles.message_text}>{props.message}</span>
        </span>
      ) : (
        <span className={styles.message_left}>
          <ChatDots className={styles.message_icon} />
          {props.message.includes(
            "Você deseja solicitar um empréstimo?\nCondições do empréstimo\nAjuda"
          ) ? (
            <div className={styles.button_container}>
              <button
                type="button"
                id="solicitar_emprestimo"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick("solicitar_emprestimo")}
              >
                Você deseja solicitar um empréstimo?
              </button>
              <button
                type="button"
                id="condicoes_emprestimo"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick("condicoes_emprestimo")}
              >
                Condições do empréstimo
              </button>
              <button
                type="button"
                id="ajuda"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick("ajuda")}
              >
                Ajuda
              </button>
            </div>
          ) : props.message.includes("Deseja sair?") ? (
            <div className={styles.button_container}>
              <span className={styles.message_left}>Deseja sair?</span>
              <button
                type="button"
                id="sim"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick("sim")}
              >
                Sim
              </button>
              <button
                type="button"
                id="nao"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick("nao")}
              >
                Não
              </button>
            </div>
          ) : (
            <span className={styles.message_text}>{props.message}</span>
          )}
          {buttonResult && (
            <div className={styles.message_text}>{buttonResult}</div>
          )}
          <ToastContainer position="top-right" />
        </span>
      )}
    </div>
  );
}
ChatMessage.propTypes = {
  user: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

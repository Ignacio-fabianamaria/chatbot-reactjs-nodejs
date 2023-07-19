import PropTypes from "prop-types";
import styles from "./ChatMessage.module.css";
import { ChatDots, Person } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { FileEarmark } from 'react-bootstrap-icons';
import { requestChatCsv, requestConversation } from "../../services/requests";
import { ToastContainer, toast } from "react-toastify";
import { isAxiosError } from "axios";
import { applyForLoan, help, loanConditions, moreInformations } from "../../utils/loanOptions";

export default function ChatMessage(props) {
  const [buttonResult, setButtonResult] = useState("");
  const [chatData, setChatData] = useState([]);
  const [showCSVButton, setShowCSVButton] = useState(false);
  const [currentButtonId, setCurrentButtonId] = useState("");
  const [isExportDisabled, setExportDisabled] = useState(true);

  const handleButtonClick = async (buttonId) => {
    try {
      let result;
      setCurrentButtonId(buttonId);
      if (buttonId === "solicitar_emprestimo") {
        result = applyForLoan;
        setButtonResult(result);
      } else if (buttonId === "condicoes_emprestimo") {
        result = loanConditions;
        setButtonResult(result);
      } else if (buttonId === "ajuda") {
        result = help;
        setButtonResult(result);
      } else if (buttonId === "nao") {
        result = "Em que posso te ajudar?";
        setButtonResult(result);
        setShowCSVButton(false);
      } else if (buttonId === "sim") {
        result = "Obrigado por nos contactar. Volte sempre!";
        setButtonResult(result);
        setShowCSVButton(true);
        setExportDisabled(false);
        
      }
      const updatedChatData = [
        ...chatData,
        { user: props.user, message: props.messages },
      ];
      setChatData(updatedChatData);
      await requestConversation("/conversation", {
        conversationData: updatedChatData,
      });
      const buttonParent = document.getElementById(buttonId).parentNode;
      buttonParent.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log("Error:", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log("Toast error");
      } else {
        toast.error(error.message);
        console.log("Toast error");
      }
    }
  };

  const handleExportCSV = async () => {
    try {
      const data = await requestChatCsv("/conversation/csv");
      const conversationData = data.conversationData;
  
      // header - CSV
      let csvContent = "User,Message\n";
  
      // rows - CSV
      conversationData.forEach((conversation) => {
        conversation.message.forEach((message) => {
          const { message: text, user } = message;
          const formattedText = text.replace(/\n/g, " "); // Remover quebras de linha
          const row = `${formattedText},${user ? "User" : ""}\n`;
          csvContent += row;
        });
      });
  
      // link - download do CSV
      const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "conversation.csv");
      document.body.appendChild(link);
      link.click();

      toast.success("CSV exportado com sucesso");
    } catch (error) {
      console.log("Error:", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log("Toast error");
      } else {
        toast.error(error.message);
        console.log("Toast error");
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
            <div className={styles.message_text}>
              {Array.isArray(buttonResult) ? (
                buttonResult.map((text, index) => (
                  <div key={index}>{text}</div>
                ))
              ) : (
                <div>{buttonResult}</div>
              )}
              {moreInformations[currentButtonId] && (
                <div>
                  <a
                    href={moreInformations[currentButtonId]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mais informações
                  </a>
                </div>
              )}
            </div>
          )}
         {buttonResult && showCSVButton && (
            <div className={styles.message_text}>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={isExportDisabled}
                  className="btn btn-link"
                >
                  conversation.csv
                <FileEarmark className={styles.fileIcon} />
                </button>

              </div>
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

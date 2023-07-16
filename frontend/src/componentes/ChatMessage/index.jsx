import PropTypes from "prop-types";
import styles from "./ChatMessage.module.css";
import { ChatDots, Person } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export default function ChatMessage(props) {
  const [buttonResult, setButtonResult] = useState('');

  const handleButtonClick = (buttonId) => {
    let result;
    if (buttonId === 'solicitar_emprestimo') {
      result = 'Você solicitou um empréstimo';
      setButtonResult(result);
    } else if (buttonId === 'condicoes_emprestimo') {
      result = 'Você solicitou condições de empréstimo';
      setButtonResult(result);
    } else if (buttonId === 'ajuda') {
      result = 'Você solicitou ajuda';
      setButtonResult(result);
    }

    const buttonParent = document.getElementById(buttonId).parentNode;
    buttonParent.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('buttonResult atualizado:', buttonResult);
  }, [buttonResult]);

  return (
    <div className={`d-flex ${props.user ? 'justify-content-end' : ''}`}>
      {props.user ? (
        <span className={styles.message_right}>
          <Person className={styles.message_icon} />
          <span className={styles.message_text}>{props.message}</span>
        </span>
      ) : (
        <span className={styles.message_left}>
          <ChatDots className={styles.message_icon} />
          {props.message.includes(
            'Você deseja solicitar um empréstimo?\nCondições do empréstimo\nAjuda'
          ) ? (
            <div className={styles.button_container}>
              <button
                type="button"
                id="solicitar_emprestimo"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick('solicitar_emprestimo')}
              >
                Você deseja solicitar um empréstimo?
              </button>
              <button
                type="button"
                id="condicoes_emprestimo"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick('condicoes_emprestimo')}
              >
                Condições do empréstimo
              </button>
              <button
                type="button"
                id="ajuda"
                className="btn btn-info btn-sm"
                onClick={() => handleButtonClick('ajuda')}
              >
                Ajuda
              </button>
            </div>
          ) : (
            <span className={styles.message_text}>{props.message}</span>
          )}
          {buttonResult && (
            <div className={styles.message_text}>{buttonResult}</div>
          )}
        </span>
      )}
    </div>
  );
}

ChatMessage.propTypes = {
  user: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

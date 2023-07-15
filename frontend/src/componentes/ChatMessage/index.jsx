import PropTypes from 'prop-types';
import styles from './ChatMessage.module.css';
import { ChatDots, Person } from 'react-bootstrap-icons';

export default function ChatMessage(props) {
  return (
    <div className={`d-flex ${props.user ? 'justify-content-end' : ''}`} >
        {
        props.user ? (
          <span className={styles.message_rigth} >
            <span className={styles.message_text} >{props.message}</span>
            <Person className={styles.message_icon} />
          </span>
        ) : (
          <span>
            <ChatDots className={styles.message_icon} />
            <span className={styles.message_text}>{props.message}</span>
          </span>
        )
        
        }
        </div>
  )
}

ChatMessage.propTypes = {
  user: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
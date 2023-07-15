import PropTypes from 'prop-types';
import styles from './ChatMessage.module.css';
import { ChatDots, Person } from 'react-bootstrap-icons';

export default function ChatMessage(props) {
  return (
    <div className={`d-flex ${props.user ?  'justify-content-end' : ''}`} >
        {
        props.user ? (
          <span className={styles.message_right} >
            <Person className={styles.message_icon} />
            <span className={styles.message_text} >{props.message}</span>
          </span>
        ) : (
          <span className={styles.message_left}>
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
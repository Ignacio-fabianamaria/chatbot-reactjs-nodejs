import { useState } from "react";
import PropTypes from 'prop-types';
import styles from "./Header.module.css";
import { requestLogin } from "../../services/requests";
import { isAxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Header({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [/* isLogged */, setIsLogged] = useState(false);
  const [chatData, setChatData] = useState(""); // Estado para armazenar a mensagem do chatData
  const [chatEnabled, setChatEnabled] = useState(false);

  const login = async () => {
    try {
      const data = await requestLogin("/login", { username, password });
      console.log("Role do usuário:", data.role);
      toast.success('Logado com sucesso');
      
      // Verificar o papel do usuário
      if (data.role === 'user') {
        // Habilitar o chat
        setChatEnabled(false);
        setIsLogged(true);
        onLoginSuccess(username)
      } else if (data.role === 'admin') {
        setChatData('Olá Admin!');
        setChatEnabled(true)
        setIsLogged(false);
        console.log(chatData);
      }
      
    } catch (error) {      
      setIsLogged(false);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else if (error.message === "Network Error") {
        toast.error("Erro de conexão. Verifique sua conexão com a internet.");
      } else {
        toast.error("Ocorreu um erro durante o login.");
      }
    }
  };
  

  return (
    <header className={styles.header}>
      <form className={styles.form_login}>
        <label className="form-label">
          Username:
          <input
          type="text"
          className="form-control"
          value={ username }
          onChange={ ({target: {value}}) => setUsername(value) }
          />
        </label>
        <label className="form-label">
          Password:
          <input
          type="password"
          className="form-control"
          value={ password }
          onChange={({target:{value}}) => setPassword(value)}
          />
        </label>

        <button type="button" className="btn btn-primary" onClick={login} >
          Login
        </button>
      </form>
      {chatEnabled && <span>{chatData}</span>} {/* Exibir o chatData se o chat estiver habilitado */}
      <ToastContainer position="top-right" />
    </header>
  );
}

Header.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};
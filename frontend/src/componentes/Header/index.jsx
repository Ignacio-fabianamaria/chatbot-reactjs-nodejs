import { useState } from "react";
import styles from "./Header.module.css";
import { requestLogin } from "../../services/requests";
import { isAxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Header() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [/* isLogged */, setIsLogged] = useState(false);

  const login = async () => {
    try {
      await requestLogin("/login", { username, password });
      toast.success('Cadastrado com sucesso');
      setIsLogged(true);
      
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:22 ~ login ~ error:", error)
      
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
      <ToastContainer position="top-right" />
    </header>
  );
}

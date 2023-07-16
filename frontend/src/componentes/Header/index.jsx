import { useState } from "react";
import styles from "./Header.module.css";
import { requestLogin } from "../../services/requests";

export default function Header() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [/* isLogged */, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async () => {
    try {
      await requestLogin("/login", { username, password });
      console.log("🚀 ~ file: index.jsx:14 ~ login ~ password:", password)
      console.log("🚀 ~ file: index.jsx:14 ~ login ~  username:",  username)
      setIsLogged(true);
      setFailedTryLogin(false);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
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
        {
            (failedTryLogin)
            ? (
                <span>{
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }</span>
            )
            : null
        }
      </form>
    </header>
  );
}

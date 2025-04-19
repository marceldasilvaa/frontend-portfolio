import "./Auth.css";

// links
import { Link, useNavigate } from "react-router-dom";

// components
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// slice
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));

    navigate("/");
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>Login</h2>
      <div className="container">
        <hr />
        <p>Faça o login para acompanhar as novidades do meu portfólio!</p>
        <div className="formAuth">
          <form onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email || ""}
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
              />
            </label>
            {!loading && (
              <input type="submit" value="Entrar" className="btn-login" />
            )}
            {loading && (
              <input
                type="submit"
                value="Aguarde..."
                className="btn-login"
                disabled
              />
            )}
            {error && <Message msg={error} type={"err"} />}
          </form>
        </div>
        <div className="dontHaveAccount">
          <hr />
          <p>Você ainda não tem uma conta?</p>
          <Link to="/register">
            <Button children={"Registre-se"} className={"btn-to-register"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

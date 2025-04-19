import "./Auth.css";

// components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const createUser = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(createUser));
  };

  // clean all auth state
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>Registre-se</h2>
      <div className="container">
        <hr />
        <p>Cadastre-se para ver meu portfólio!</p>
        <div className="formAuth">
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome</span>
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
              />
            </label>
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
            <label>
              <span>Confirmar senha</span>
              <input
                type="password"
                placeholder="Confirmar senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword || ""}
              />
            </label>
            {!loading && (
              <input
                type="submit"
                value="Criar minha conta"
                className="btn-register"
              />
            )}
            {loading && (
              <input
                type="submit"
                value="Aguarde..."
                className="btn-register"
                disabled
              />
            )}
            {error && <Message msg={error} type="err" />}
          </form>
        </div>
        <div className="haveAccount">
          <p>
            Já tem uma conta? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

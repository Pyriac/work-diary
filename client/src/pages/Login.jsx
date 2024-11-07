import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import myAxios from "../services/myAxios";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await myAxios.post(
        `/api/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCurrentUser(response);
        navigate("/home");
        console.info(response);
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="login">
      <h2>Bienvenue</h2>
      <h3>Connectez-vous pour accèder à votre espace</h3>
    <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="email">email</label>{" "}
        <input ref={emailRef} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">password</label>{" "}
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit">Connexion</button>
    </form>
    </section>
  );
}

export default Login;

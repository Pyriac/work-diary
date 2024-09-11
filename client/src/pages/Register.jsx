import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // Référence pour le champ email
  const emailRef = useRef();
  const nameRef = useRef();

  // États pour le mot de passe et la confirmation du mot de passe
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de changement du mot de passe
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Gestionnaire de changement de la confirmation du mot de passe
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== "" && password === confirmPassword) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: emailRef.current.value,
              name: nameRef.current.value,
              password,
            }),
          }
        );
        if (response.status === 201) {
          navigate("/");
        } else {
          console.info(response);
        }
      } else {
        console.error("Champs incorrects !");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email</label>{" "}
        <input ref={emailRef} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="name">name</label>
        <input ref={nameRef} type="text" id="name" />
      </div>
      <div>
        <label htmlFor="password">password</label>{" "}
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />{" "}
        {password.length >= 8 ? "✅" : "❌"} {`length: ${password.length} >= 8`}
      </div>
      <div>
        <label htmlFor="confirm-password">confirm password</label>{" "}
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />{" "}
        {password === confirmPassword ? "✅" : "❌"}
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default Register;

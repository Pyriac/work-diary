import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";

function Register() {
  const emailRef = useRef();
  const nameRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await myAxios.post(
        `/api/users`,
        {
          email: emailRef.current.value,
          name: nameRef.current.value,
          password,
          confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        navigate("/");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data);
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
      </div>
      <div>
        <label htmlFor="confirm-password">confirm password</label>{" "}
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <p>{errorMessage}</p>
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default Register;

import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { setUser } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );
      if (response.status === 200) {
        const user = await response.json();

        setUser(user);

        navigate("/home");
      } else {
        console.info(response);
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
        <label htmlFor="password">password</label>{" "}
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default Login;

import { useLoaderData } from "react-router-dom";

export default function Profil() {
  const user = useLoaderData();
  return (
    <>
      <h1>Coucou {user.name}</h1>
      <p>tu souhaites changer ton mot de passe ?</p>
    </>
  );
}

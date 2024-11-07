import { useLoaderData, Form } from "react-router-dom";

export default function Profil() {
  const user = useLoaderData();
  return (
    <>
      <h1>Hello {user.name}</h1>
      Modifier tes infos : 
      <Form method="put">
<label htmlFor="name">Tu souhaites afficher un autre nom ?</label>
<input type="text" name="name" placeholder={user.name} />
<label htmlFor="email">changer ton mail</label>
<input type="email" name="email" placeholder={user.email} />
<p>tu souhaites changer ton mot de passe ?</p>
<label htmlFor="old-password">Saisi ton anicen mot de passe</label>
<input type="password" name="old-password"/>
<label htmlFor="password">Nouveau mot de passe</label>
<input type="password" name="password" />
      </Form>
   
    </>
  );
}

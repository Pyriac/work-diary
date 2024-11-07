import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import TasksForm from "../components/Tasks_Form";

function AddTask() {
  const [addStatus, setAddStatus] = useState("");
  const [addClass, setAddClass] = useState("");
  const actionData = useActionData();
  console.info(actionData);
  useEffect(() => {
    if (actionData) {
      setAddStatus(actionData.message);
      setAddClass(actionData.status)
    }
  }, [actionData]);
console.info(addClass)
  return (
    <Form method="post" className="task">
      <h2>Un nouveau dossier ? Ajoute-le ici 👇</h2>
      <p className={addClass}>{addStatus}</p>
      <TasksForm />
      <button type="submit" className="taskSubmit">Ajouter</button>
    
    </Form>
  );
}
export default AddTask;

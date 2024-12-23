
import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";import TasksForm from "../components/Tasks_Form";

function EditTask() {
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
  return ( 
  <Form method="put" className="task">
  <h2>Des nouvelles ? Modifie ce que tu veux ✏️</h2>
  <p className={addClass}>{addStatus}</p>
  <TasksForm />
  <button type="submit" className="taskSubmit">Modifier</button>

</Form>
);
}

export default EditTask;

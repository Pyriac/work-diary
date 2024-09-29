import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import TasksForm from "../components/Tasks_Form";

function AddTask() {
  const [addStatus, setAddStatus] = useState("");
  const actionData = useActionData();
  console.info(actionData);
  useEffect(() => {
    if (actionData) {
      setAddStatus(actionData.message);
    }
  }, [actionData]);

  return (
    <Form method="post">
      <TasksForm />
      <button type="submit">Envoyer</button>
      <p>{addStatus}</p>
    </Form>
  );
}
export default AddTask;

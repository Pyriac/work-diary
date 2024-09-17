import { Form, useActionData } from "react-router-dom";
import TasksForm from "../components/Tasks_Form";

function AddTask() {
  const actionData = useActionData();
  const errormessage = actionData.message;
  return (
    <Form method="post">
      <TasksForm />
      <button type="submit">Envoyer</button>
      <p>{errormessage || ""}</p>
    </Form>
  );
}
export default AddTask;

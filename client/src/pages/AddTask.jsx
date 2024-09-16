import { Form } from "react-router-dom";
import TasksForm from "../components/Tasks_Form";

function AddTask() {
  return (
    <Form method="post">
      <TasksForm />
      <button type="submit">Envoyer</button>
    </Form>
  );
}
export default AddTask;

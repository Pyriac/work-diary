function TasksForm() {
  return (
    <>
      <label htmlFor="task">Nom de la tâche</label>
      <input type="text" name="task" />
      <label htmlFor="client">Client</label>
      <input type="text" name="client" />
      <select name="devis" id="">
        Devis
      </select>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <label htmlFor="description">Commentaires</label>
      <input type="text" name="description" />
      <label htmlFor="short_term"></label>
      <input type="text" name="short-term" />
      <label htmlFor="estimated_day"></label>
      <input type="text" name="estimated_day" />
      <label htmlFor="deadline"></label>
      <input type="date" name="deadline" />
    </>
  );
}
export default TasksForm;

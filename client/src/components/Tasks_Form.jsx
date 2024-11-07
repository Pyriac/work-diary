function TasksForm() {
  return (
    <>
    <section>
      <label htmlFor="task">Nom de la tâche</label>
      <input type="text" name="task" />
      <label htmlFor="client">Client</label>
      <input type="text" name="client" />
      <label htmlFor="estimation">Devis</label>
      <select name="estimation" id="estimation">
        <option value="">--Choisir une option--</option>
        <option value="to_do">A faire</option>
        <option value="send">Envoyé</option>
        <option value="sign">Signé</option>
      </select>
      <label htmlFor="description">Commentaires</label>
      <textarea type="text" name="description" />
      <label htmlFor="short_term">A faire à court terme</label>
      <input type="text" name="short-term" />
      <label htmlFor="estimated_day">Durée estimée en jours</label>
      <input type="number" name="estimated_day" step="0.5" />
      <label htmlFor="deadline">Date limite</label>
      <input type="date" name="deadline" />
      </section>
    </>
  );
}
export default TasksForm;

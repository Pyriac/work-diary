import PropTypes from 'prop-types';

function TasksForm({ task }) {
  console.info(task);

  return (
    <>
      <section>
        <label htmlFor="task">Nom de la tâche</label>
        <input type="text" name="task" defaultValue={task && task.task} />

        <label htmlFor="client">Client</label>
        <input type="text" name="client" defaultValue={task && task.client} />

        <label htmlFor="estimation">Devis</label>
        <select name="estimation" id="estimation" defaultValue={task && task.estimation}>
          <option value="">--Choisir une option--</option>
          <option value="to_do">A faire</option>
          <option value="send">Envoyé</option>
          <option value="sign">Signé</option>
        </select>

        <label htmlFor="description">Commentaires</label>
        <textarea name="description" defaultValue={task && task.description} />

        <label htmlFor="short_term">A faire à court terme</label>
        <input type="text" name="short_term" defaultValue={task && task.short_term} />

        <label htmlFor="estimated_day">Durée estimée en jours</label>
        <input
          type="number"
          name="estimated_day"
          step="0.5"
          defaultValue={task && task.estimated_day}
        />

        <label htmlFor="deadline">Date limite</label>
        <input
          type="date"
          name="deadline"
          defaultValue={task && task.deadline ? task.deadline.slice(0, 10) : ''}
        />
      </section>
    </>
  );
}

TasksForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired, // Identifiant unique de la tâche
    user_id: PropTypes.string.isRequired, // Identifiant de l'utilisateur
    client: PropTypes.string.isRequired, // Nom du client
    deadline: PropTypes.string.isRequired, // Date limite au format ISO 8601
    description: PropTypes.string, // Détails de la tâche (ou null)
    estimated_day: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired, // Temps estimé pour la tâche
    estimation: PropTypes.string.isRequired, // Statut de la tâche
    is_active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]).isRequired, // Actif (booléen ou 1/0)
    short_term: PropTypes.string.isRequired, // Objectif à court terme
    task: PropTypes.string.isRequired, // Nom ou description principale de la tâche
  }),
};

export default TasksForm;


import { useEffect, useState } from "react";
import { useLoaderData, Link, Form, useActionData } from "react-router-dom";

export default function TaskDetail() {
  const data = useLoaderData();
  const response = useActionData();
console.info(response)
  console.info(data)
  const [showPopup, setShowPopup] = useState(false);

  // Fonction pour afficher ou masquer le pop-up
  const togglePopup = () => setShowPopup(!showPopup);

  const [className, setClassName] = useState("task_detail");
  const [currentDate, setCurrentDate] = useState(null);
  useEffect(() => {
    setShowPopup(false)
  }, [response])

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (currentDate && data.deadline && data.estimated_day) {
      const daysDifference = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round((date1 - date2) / oneDay);
      };

      const daysLeft = daysDifference(new Date(data.deadline), currentDate);
      const dureeEstimee = parseFloat(data.estimated_day);

      if (daysLeft < dureeEstimee) {
        setClassName("task_detail_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("task_detail_orange");
      } else {
        setClassName("task_detail");
      }
    }
  }, [currentDate, data.deadline, data.estimated_day]);

  return (
    <div>
      {!data.client ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className={className}>
          <h3 className="client_name">{data.client}</h3>
          <h4 className="task_name">{data.task}</h4>
          {data.short_term && (
            <p className="fast_task">
              <strong className="underline">à faire à court terme</strong> :{" "}
              {data.short_term}
            </p>
          )}
          {data.description && <p className="desc">{data.description}</p>}
          <h4 className="duree">
            {data.estimated_day}{" "}
            {data.estimated_day === "1" ||
            data.estimated_day === "0.5" ||
            data.estimated_day === "0,5"
              ? "jour"
              : "jours"}{" "}
            de travail prévu
          </h4>
          <p className="deadline">
            à faire avant le :{" "}
            <strong>
              {new Date(data.deadline).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>
        </div>
        <button>
          <Link to={`/edit/task/${data.id}`}>
          Mettre à jour
          </Link>

        </button>
        {data.is_active ?  <button onClick={togglePopup}>
Archiver
        </button> : ""}
       
        {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h3>Confirmation</h3>
            <p>Êtes-vous sûr de vouloir archiver cette tâche ?</p>
            <p>Cette action est irréversible</p>
            <div className="actions">
              <Form method="put">
              <button type="submit" className="confirmButton">
                Confirmer
              </button>
              </Form>
              <button onClick={togglePopup} className="cancelButton">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
      
    </div>
  );
}

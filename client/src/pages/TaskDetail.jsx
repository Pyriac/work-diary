import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import Papa from "papaparse";

export default function TaskDetail() {
  const tasksFromLoader = useLoaderData();
  const { id } = useParams();

  const [className, setClassName] = useState("big_card");
  const [currentDate, setCurrentDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [data, setData] = useState([]);
  const [task, setTask] = useState({});

  function parseDateString(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year + 2000, month - 1, day);
  }

  useEffect(() => {
    Papa.parse(tasksFromLoader, {
      header: true,
      complete: (result) => {
        console.log("Parsed data:", result.data);
        setData(result.data);
      },
      error: (error) => console.error(error),
    });
  }, [tasksFromLoader]);

  useEffect(() => {
    if (data.length > 0 && id) {
      const taskId = parseInt(id, 10) - 1;
      if (taskId >= 0 && taskId < data.length) {
        setTask(data[taskId]);
      }
    }
  }, [data, id]);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (task.Deadline) {
      const deadline = parseDateString(task.Deadline);
      if (!isNaN(deadline.getTime())) {
        setDeadlineDate(deadline);
      } else {
        console.error("Invalid Deadline date:", task.Deadline);
      }
    }
  }, [task.Deadline]);

  useEffect(() => {
    if (currentDate && deadlineDate && task.Duree_estimee) {
      const daysDifference = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round((date1 - date2) / oneDay);
      };

      const daysLeft = daysDifference(deadlineDate, currentDate);
      const dureeEstimee = parseFloat(task.Duree_estimee);

      if (daysLeft < dureeEstimee) {
        setClassName("big_card_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("big_card_orange");
      } else {
        setClassName("big_card");
      }
    }
  }, [currentDate, deadlineDate, task.Duree_estimee]);

  return (
    <div>
      {!task.Client ? (
        <p>Loading...</p>
      ) : (
        <div className={className}>
          <h3 className="client_name">{task.Client}</h3>
          <h4 className="task_name">{task.Tache}</h4>
          {task.A_faire_a_court_terme && (
            <p className="fast_task">
              <strong className="underline">à faire à court terme</strong> :{" "}
              {task.A_faire_a_court_terme}
            </p>
          )}
          {task.Description && <p className="desc">{task.Description}</p>}
          <h4 className="duree">
            {task.Duree_estimee}{" "}
            {task.Duree_estimee === "1" ||
            task.Duree_estimee === "0.5" ||
            task.Duree_estimee === "0,5"
              ? "jour"
              : "jours"}{" "}
            de travail prévu
          </h4>
          <p className="deadline">
            à faire avant le : <strong>{task.Deadline}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

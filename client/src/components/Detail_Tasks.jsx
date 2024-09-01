import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/app.css";

export default function DetailTasks({ data }) {
  const [currentDate, setCurrentDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [className, setClassName] = useState("big_card");

  const daysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date1 - date2) / oneDay);
    return diffDays;
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (currentDate && data.deadline) {
      const deadlineData = data.deadline;
      setDeadlineDate(deadlineData);
    }
  }, [currentDate, data.deadline]);

  console.info(deadlineDate);
  console.info(currentDate);
  console.info(data.estimated_day);

  useEffect(() => {
    if (currentDate && deadlineDate !== null && data.estimated_day) {
      const daysLeft = daysDifference(new Date(deadlineDate), currentDate);
      const dureeEstimee = parseFloat(data.estimated_day);

      console.info(daysLeft);
      console.info(dureeEstimee);

      if (daysLeft < dureeEstimee) {
        setClassName("big_card_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("big_card_orange");
      } else {
        setClassName("big_card");
      }
    }
  }, [currentDate, deadlineDate, data.estimated_day]);
  return (
    <div className={className}>
      <h3 className="client_name">{data.client}</h3>
      <h4 className="task_name">{data.task}</h4>
      {data.short_term ? (
        <p className="fast_task">
          <strong className="underline">à faire à court terme</strong> :{" "}
          {data.short_term}
        </p>
      ) : null}
      {data.description ? <p className="desc">{data.description}</p> : null}

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
        {" "}
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
  );
}

DetailTasks.propTypes = {
  data: PropTypes.shape({
    client: PropTypes.string,
    deadline: PropTypes.instanceOf(Date),
    estimated_day: PropTypes.string,
    task: PropTypes.string,
    short_term: PropTypes.string,
    description: PropTypes.string,
  }),
};

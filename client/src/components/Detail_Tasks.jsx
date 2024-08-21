import { useEffect, useState } from "react";
import "../assets/styles/app.css";

export default function DetailTasks(data) {
  console.info(data);

  const [currentDate, setCurrentDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [className, setClassName] = useState("big_card");

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const fullYear = year < 100 ? 2000 + year : year;
    return new Date(fullYear, month - 1, day);
  };

  const daysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    return diffDays;
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (currentDate && data.data.Deadline) {
      const deadlineData = parseDate(data.data.Deadline);
      setDeadlineDate(deadlineData);
    }
  }, [currentDate, data.data.Deadline]);

  useEffect(() => {
    if (currentDate && deadlineDate !== null && data.data.Duree_estimee) {
      const daysLeft = daysDifference(deadlineDate, currentDate);
      const dureeEstimee = parseFloat(data.data.Duree_estimee);

      if (daysLeft < dureeEstimee) {
        setClassName("big_card_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("big_card_orange");
      } else {
        setClassName("big_card");
      }
    }
  }, [currentDate, deadlineDate, data.data.Duree_estimee]);
  return (
    <div className={className}>
      <h3 className="client_name">{data.data.Client}</h3>
      <h4 className="task_name">{data.data.Tache}</h4>
      <p className="desc">{data.data.Description}</p>
      <h4 className="duree">
        {data.data.Duree_estimee}{" "}
        {data.data.Duree_estimee === "1" ||
        data.data.Duree_estimee === "0.5" ||
        data.data.Duree_estimee === "0,5"
          ? "jour"
          : "jours"}{" "}
        de travail prévu
      </h4>
      <p className="deadline">
        {" "}
        à faire avant le : <strong>{data.data.Deadline}</strong>
      </p>
    </div>
  );
}

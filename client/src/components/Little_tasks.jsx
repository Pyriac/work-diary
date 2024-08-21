import "../assets/styles/app.css";
import { useEffect, useState } from "react";

export default function Little_tasks(data) {
  const [currentDate, setCurrentDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [littleClassName, setClassName] = useState("card");

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const fullYear = year < 100 ? 2000 + year : year;
    return new Date(fullYear, month - 1, day);
  };

  const daysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date1 - date2) / oneDay);
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

      console.info(daysLeft);
      if (daysLeft < dureeEstimee || daysLeft < 0) {
        setClassName("card_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("card_orange");
      } else {
        setClassName("card");
      }
    }
  }, [currentDate, deadlineDate, data.data.Duree_estimee]);

  return (
    <div className={littleClassName}>
      <h3>{data.data.Client}</h3>
      <h4>{data.data.Tache}</h4>
      <p className="little_desc">{data.data.Description}</p>
      <h4>
        {data.data.Duree_estimee}{" "}
        {data.data.Duree_estimee === "1" ||
        data.data.Duree_estimee === "0.5" ||
        data.data.Duree_estimee === "0,5"
          ? "jour"
          : "jours"}{" "}
        de travail prévu
      </h4>
    </div>
  );
}

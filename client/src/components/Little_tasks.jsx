import "../assets/styles/app.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Little_tasks({ data }) {
  const [currentDate, setCurrentDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [littleClassName, setClassName] = useState("card");
  console.info(data.estimated_day);

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
    if (currentDate && data.deadline) {
      const deadlineData = parseDate(data.deadline);
      setDeadlineDate(deadlineData);
    }
  }, [currentDate, data.deadline]);

  useEffect(() => {
    if (currentDate && deadlineDate !== null && data.estimated_day) {
      const daysLeft = daysDifference(deadlineDate, currentDate);
      const dureeEstimee = parseFloat(data.estimated_day);

      if (daysLeft < dureeEstimee || daysLeft < 0) {
        setClassName("card_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("card_orange");
      } else {
        setClassName("card");
      }
    }
  }, [currentDate, deadlineDate, data.estimated_day]);

  return (
    <div className={littleClassName}>
      <h3>{data.client}</h3>
      <h4>{data.task}</h4>
      <p className="little_desc">{data.short_term}</p>
      <h4>
        {data.estimated_day}{" "}
        {data.estimated_day === "1" ||
        data.estimated_day === "0.5" ||
        data.estimated_day === "0,5"
          ? "jour"
          : "jours"}{" "}
        de travail prévu
      </h4>
    </div>
  );
}

Little_tasks.propTypes = {
  data: PropTypes.shape({
    client: PropTypes.string,
    deadline: PropTypes.instanceOf(Date),
    estimated_day: PropTypes.string,
    task: PropTypes.string,
    short_term: PropTypes.string,
  }),
};

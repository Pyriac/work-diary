import "../assets/styles/app.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Little_tasks({ data }) {
  const [currentDate, setCurrentDate] = useState(null);
  const [littleClassName, setClassName] = useState("card");

  const daysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date1 - date2) / oneDay);
    return diffDays;
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (currentDate && data.deadline !== null && data.estimated_day) {
      const daysLeft = daysDifference(new Date(data.deadline), currentDate);
      const dureeEstimee = parseFloat(data.estimated_day);

      if (daysLeft < dureeEstimee || daysLeft < 0) {
        setClassName("card_red");
      } else if (daysLeft - dureeEstimee < 2) {
        setClassName("card_orange");
      } else {
        setClassName("card");
      }
    }
  }, [currentDate, data.deadline, data.estimated_day]);

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
    deadline: PropTypes.string,
    estimated_day: PropTypes.string,
    task: PropTypes.string,
    short_term: PropTypes.string,
  }),
};

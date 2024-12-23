import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Nav_bar() {
  const [display_date_and_time, setDisplay_date_and_time] = useState("");

  function updateDate() {
    const date_and_time = new Date();
    const display_date_and_time = date_and_time.toLocaleString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setDisplay_date_and_time(display_date_and_time);
  }

  useEffect(() => {
    updateDate();
    setInterval(updateDate, 1000);
  }, []);

  return (
    <div className="nav">
      <Link to="/">
        <p>Accueil</p>
      </Link>
      <Link to="/profil">
        {" "}
        <p>Profil</p>
      </Link>
      <p className="nav_time">⌚️{display_date_and_time}</p>
      <Link to="/add/task">
        <p>Nouvelle Tâche</p>
      </Link>
      <Link to="/tasks">
        <p>Tâches</p>
      </Link>
    </div>
  );
}

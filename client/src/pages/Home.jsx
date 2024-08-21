import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Papa from "papaparse";
import "../assets/styles/app.css";
import Little_tasks from "../components/Little_tasks";

function Home() {
  const tasksFromLoader = useLoaderData();
  const [data, setData] = useState([]);
  useEffect(() => {
    Papa.parse(tasksFromLoader, {
      header: true,
      complete: (result) => {
        setData(result.data);
      },
      error: (error) => console.error(error),
    });
  }, [tasksFromLoader]);

  const duree_totale = data.reduce(
    (total, task) => total + parseFloat(task.Duree_estimee),
    0
  );

  const date_aujourdhui = new Date();

  const jours_totaux = duree_totale + Math.floor(duree_totale / 3) * 4;

  const date_dispo = new Date();
  date_dispo
    .setDate(date_aujourdhui.getDate() + jours_totaux)
    .toLocaleString("fr-FR");

  const date_formatee = date_dispo.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {" "}
      <div className="header">
        <h1>Bonjour Laurent</h1>
        <h2>
          Tu as {data.length} missions en cours pour un total de {duree_totale}{" "}
          jours.
        </h2>
        <h2>Ta prochaine disponibilité sera la {date_formatee}.</h2>

        <p>
          Le lien pour éditer ton agenda :{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1rDTGPwr0nW1ReU2sI9y4C_ZEJ6GXaV14iOzaEi5Hr4M/edit?usp=sharing"
            target="_blank"
          >
            Google Sheet
          </a>
        </p>
      </div>
      <div className="grid-container">
        {data.map((task) => (
          <Link
            to={`/task/${task.ID}`}
            key={task.Tache + task.Duree_estimee + task.Deadline}
          >
            <Little_tasks data={task} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;

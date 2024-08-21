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

  return (
    <>
      {" "}
      <div className="header">
        <h1>Bonjour Laurent</h1>
        <h2>
          Tu as {data.length} missions en cours pour un total de {duree_totale}{" "}
          jours.
        </h2>
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
            to="tasks"
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

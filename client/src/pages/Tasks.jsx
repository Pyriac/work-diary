import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Papa from "papaparse";
import "../assets/styles/app.css";
import Detail_tasks from "../components/Detail_Tasks";

export default function Tasks() {
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

  console.info(data);

  const dataDate = data.map((task) => {
    const [day, month, year] = task.Deadline.split("/");
    const fullYear = year.length === 2 ? `20${year}` : year;
    const formattedDate = `${fullYear}-${month}-${day}`;
    return {
      ...task,
      Deadline: new Date(Date.parse(formattedDate)),
    };
  });

  console.info(dataDate);

  const sortedData = dataDate.sort((a, b) => {
    return a.Deadline - b.Deadline;
  });

  console.info(sortedData);

  return (
    <>
      <div className="all_tasks">
        {sortedData.map((task) => (
          <Detail_tasks
            key={
              task.Tache +
              task.Duree_estimee +
              task.Deadline.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }
            data={task}
          />
        ))}
      </div>
    </>
  );
}

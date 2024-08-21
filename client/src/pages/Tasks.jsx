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

  return (
    <>
      <div className="all_tasks">
        {data.map((task) => (
          <Detail_tasks
            key={task.Tache + task.Duree_estimee + task.Deadline}
            data={task}
          />
        ))}
      </div>
    </>
  );
}

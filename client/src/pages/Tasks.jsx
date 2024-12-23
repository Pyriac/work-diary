import { Link, useLoaderData } from "react-router-dom";
import "../assets/styles/app.css";
import Detail_tasks from "../components/Detail_Tasks";
import { useEffect, useState } from "react";

export default function Tasks() {
  const [archiveFilter, setArchiveFilter] =useState(0)
  const data = useLoaderData();

  let sortedData = data.sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
  });



  return (
   
    <>
       <button onClick={() => setArchiveFilter((prev) => (prev === 0 ? 1 : 0))}>
        {archiveFilter === 1 ? 'Afficher les archivés' : 'Afficher les actifs'}
      </button>
      <div className="all_tasks">
        {sortedData.filter((task) => task.is_active === archiveFilter).map((task) => (
          <Link to={`/task/${task.id}`} key={task.id}>
            <Detail_tasks data={task} />
          </Link>
        ))}
      </div>
    </>
  );
}

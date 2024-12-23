import { Link, useLoaderData } from "react-router-dom";
import "../assets/styles/app.css";
import Detail_tasks from "../components/Detail_Tasks";
import { useState } from "react";

export default function Tasks() {
  const [archiveFilter, setArchiveFilter] =useState(1)
  const [searchFilter, setSearchFilter] = useState("");
  const data = useLoaderData();

  let sortedData = data
  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  .filter(
    (task) =>
      task.is_active === archiveFilter && // Filtrer actif/inactif
      task.client.toLowerCase().includes(searchFilter.toLowerCase()) // Filtrer par texte
  );



  return (
   
    <>
       <button onClick={() => setArchiveFilter((prev) => (prev === 0 ? 1 : 0))}>
        {archiveFilter === 1 ? 'Afficher les archivés' : 'Afficher les actifs'}
      </button>
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        style={{ marginLeft: "10px", padding: "5px" }}
      />
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

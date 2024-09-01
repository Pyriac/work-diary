import { Link, useLoaderData } from "react-router-dom";
import "../assets/styles/app.css";
import Detail_tasks from "../components/Detail_Tasks";

export default function Tasks() {
  const data = useLoaderData();
  console.info(data);

  const sortedData = data.sort((a, b) => {
    return a.deadline - b.deadline;
  });

  console.info(sortedData);

  return (
    <>
      <div className="all_tasks">
        {sortedData.map((task) => (
          <Link to={`/task/${task.id}`} key={task.id}>
            <Detail_tasks data={task} />
          </Link>
        ))}
      </div>
    </>
  );
}

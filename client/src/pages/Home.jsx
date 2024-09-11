import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "../assets/styles/app.css";
import Little_tasks from "../components/Little_tasks";
import { useEffect, useState } from "react";
import myAxios from "../services/myAxios";

function Home() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await myAxios.get("/api/auth-cookie", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de connexion",
          error
        );
        navigate("/");
      }
    };

    fetchAuth();
  }, [navigate]);

  console.info(user);

  const estimated_delay = data.reduce(
    (total, task) => total + parseFloat(task.estimated_day),
    0
  );

  const date_of_the_day = new Date();

  const total_delay = estimated_delay + Math.floor(estimated_delay / 3) * 4;

  const available = new Date();
  available
    .setDate(date_of_the_day.getDate() + total_delay)
    .toLocaleString("fr-FR");

  const formated_date = available.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!user) {
    return navigate("/");
  }
  return (
    <>
      {" "}
      <div className="header">
        <h1>Bonjour {user.name}</h1>
        <h2>
          Tu as {data.length} missions en cours pour un total de{" "}
          {estimated_delay} jours.
        </h2>
        <h2>Ta prochaine disponibilité sera la {formated_date}.</h2>
      </div>
      <div className="grid-container">
        {/* overflow-y :scroll */}
        {data.map((task) => (
          <Link to={`/task/${task.id}`} key={task.id}>
            <Little_tasks data={task} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;

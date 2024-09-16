import { useEffect, useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "../assets/styles/app.css";
import Little_tasks from "../components/Little_tasks";
import myAxios from "../services/myAxios";
import { UserContext } from "../contexts/userContext";

function Home() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { CurrentUser, setCurrentUser } = useContext(UserContext);
  console.info(data);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await myAxios.get("/api/auth-cookie", {
          withCredentials: true,
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de connexion",
          error
        );
        navigate("/");
      }
    };

    fetchAuth();
  }, [navigate, setCurrentUser]);

  const estimateToDo = data.filter((task) => task.estimation === "to_do");
  console.info(estimateToDo);

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

  if (!CurrentUser) {
    return navigate("/");
  }
  return (
    <>
      {" "}
      <div className="header">
        <h1>Bonjour {CurrentUser.name}</h1>
        <h2>
          Tu as {data.length} missions en cours pour un total de{" "}
          {estimated_delay} jours.
        </h2>
        <h2>Ta prochaine disponibilité sera la {formated_date}.</h2>
      </div>
      <section className="home_section">
        <div className="grid-container">
          {/* overflow-y :scroll */}
          <h3 className="Subdiv_title">Tâches urgentes</h3>
          {data.map((task) => (
            <Link to={`/task/${task.id}`} key={task.id}>
              <Little_tasks data={task} />
            </Link>
          ))}
        </div>
        <div className="estimateToDo">
          <h3 className="Subdiv_title">Devis à faire</h3>
          {estimateToDo.map((task) => (
            <Link to={`/task/${task.id}`} key={task.id}>
              <Little_tasks data={task} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

import "../assets/styles/app.css";

export default function Little_tasks(data) {
  console.info(data);
  return (
    <div className="card">
      <h3>{data.data.Client}</h3>
      <h4>{data.data.Tache}</h4>
      <p className="little_desc">{data.data.Description}</p>
      <h4>
        {data.data.Duree_estimee}{" "}
        {data.data.Duree_estimee === "1" ||
        data.data.Duree_estimee === "0.5" ||
        data.data.Duree_estimee === "0,5"
          ? "jour"
          : "jours"}{" "}
        de travail prévu
      </h4>
    </div>
  );
}

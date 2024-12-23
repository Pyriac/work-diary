import { json } from "react-router-dom";
import myAxios from "./myAxios";

const AddTasks = async ({ request, params }) => {
  const formData = await request.formData();
  switch (request.method.toLowerCase()) {
    case "post": {
      try {
        const response = await myAxios.post(
          "/api/task",
          {
            task: formData.get("task"),
            client: formData.get("client"),
            estimation: formData.get("estimation"),
            description: formData.get("description"),
            short_term: formData.get("short_term"),
            estimated_day: formData.get("estimated_day"),
            deadline: formData.get("deadline"),
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          return json({ message: "Tache ajoutée avec succès 🎉", status:"success" }, { status: 201 });
        }
      } catch (error) {
        console.error(error);
        return json({ message: error.response.data, status:"failure" }, { status: 400 });
      }

      return new Response("Tache créée avec succès", { status: 201 });
    }
    case "put": {
      try {
        const response = await myAxios.put(
          `/api/task/${params.id}`,
          {
            task: formData.get("task"),
            client: formData.get("client"),
            estimation: formData.get("estimation"),
            description: formData.get("description"),
            short_term: formData.get("short_term"),
            estimated_day: formData.get("estimated_day"),
            deadline: formData.get("deadline"),
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          return json({ message: "Tâche mise à jour ✏️", status:"success" }, { status: 200 });
        }
      } catch (error) {
        console.error(error);
        return json({ message: error.response.data, status:"failure" }, { status: 400 });
      }

      return new Response("Tache créée avec succès", { status: 200 });
    }

    default:
      throw new Response("", { status: 405 });
  }
};

export default AddTasks;

import myAxios from "./myAxios";

const AddTasks = async ({ request }) => {
  const formData = await request.formData();
  switch (request.method.toLowerCase()) {
    case "post": {
      await myAxios.post(
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
      return new Response("Tache créée avec succès", { status: 201 });
    }

    default:
      throw new Response("", { status: 405 });
  }
};

export default AddTasks;

import myAxios from "./myAxios";

const readAllTasks = async () => {
  const response = await myAxios.get("/api/task");

  return response.data;
};

export default readAllTasks;

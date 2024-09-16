import myAxios from "./myAxios";

const readAllTasks = async () => {
  const response = await myAxios.get("/api/task", {
    withCredentials: true,
  });

  return response.data;
};

export default readAllTasks;

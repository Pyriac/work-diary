import myAxios from "./myAxios";

const readActiveTasks = async () => {
  const response = await myAxios.get(`/api/tasks/active`, {
    withCredentials: true,
  });

  return response.data;
};

export default readActiveTasks;
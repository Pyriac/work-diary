import myAxios from "./myAxios";

const readTask = async ({ params }) => {
  const response = await myAxios.get(`/api/task/${params.id}`);

  return response.data;
};

export default readTask;

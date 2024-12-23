import myAxios from "./myAxios";

const archived = async ({ params }) => {
  const response = await myAxios.put(`/api/archived/${params.id}`);

  return response.status;
};

export default archived;
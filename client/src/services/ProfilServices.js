import myAxios from "./myAxios";

const readProfil = async () => {
  const response = await myAxios.get(`api/user/profile`, {
    withCredentials: true,
  });

  return response.data;
};

const profilServices = { readProfil };
export default profilServices;

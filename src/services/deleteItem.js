import api from "./api";

const deleteItem = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response;
};


export default deleteItem
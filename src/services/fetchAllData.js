import api from "./api";

const fetchAllData = async () => {
  const messages = await api.get("/messages");
  const channelsResponse = await api.get("/channels");
  const triggersResponse = await api.get("/triggers");

  return {
    message: messages.data.map((item) => {
      return {
        id: item.id,
        channel: item.channel,
        trigger: item.trigger,
        timer: item.timer,
        message: item.message,
      };
    }),
    channel: channelsResponse.data.map((item) => {
      return {
        id: item.id,
        channel: item.name,
      };
    }),
    trigger: triggersResponse.data.map((item) => {
      return {
        id: item.id,
        trigger: item.name,
      };
    }),
  };
};

export default fetchAllData;

import api from "./api";

const fetchFilteredData = async (data) => {
  const trigger = data.trigger ? `trigger_like=${data.trigger}` : "_trigger";
  const channel = data.channel ? `channel_like=${data.channel}` : "_channel";
  const timer_like = data.timer ? `timer_like=${data.timer}` : "_timer";

  return await api.get(`/messages?${trigger}&${channel}&${timer_like}`);
};

export default fetchFilteredData;

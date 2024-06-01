import axios from "axios";
const BACKEND_URL =
  "https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-ssvkjuv/endpoint";
const ADAFRUIT_DATA_HUMI_URL =
  "https://io.adafruit.com/api/v2/hwanzar/feeds/sys.humidity/data";
const ADAFRUIT_DATA_TEMP_URL =
  "https://io.adafruit.com/api/v2/hwanzar/feeds/sys.temperature/data";

export const getSchedulers = async () => {
  const response = await axios.get(BACKEND_URL + "/fetchScheduler");
  const schedulers = response.data.map((item) => {
    return {
      id: item._id,
      name: item.name,
      mixer1: item.mixer1,
      mixer2: item.mixer2,
      mixer3: item.mixer3,
      cycle: item.cycle,
      startTime: new Date(item.startTime),
      endTime: new Date(item.endTime),
      active: item.active,
    };
  });
  return schedulers;
};
export const getArea = async () => {
    const response = await axios.get(BACKEND_URL + "/fetchArea")
    const area = {
       id: response.data._id,
       area0: response.data.area0,
       area1: response.data.area1,
       area2: response.data.area2,
       created_at: new Date(response.data.created_at)
    }
    return area
}

export const updateArea = async(area) => {
    const response = await axios.put(BACKEND_URL + "/updateArea", area)
    return response.data.message
}
export const addScheduler = async (scheduler) => {
  const response = await axios.post(BACKEND_URL + "/addScheduler", scheduler);
  return response.data.id;
};

export const updateStatusScheduler = async (id, active) => {
  const response = await axios.put(BACKEND_URL + "/updateStatusScheduler", {
    id: id,
    active: active,
  });
  return response.data.message;
};
export const deleteScheduler = async (id) => {
  const response = await axios.delete(BACKEND_URL + "/deleteScheduler", {
    params: { id: id },
  });

  return response.data.message;
};

export const getTempChart = async () => {
  const response = await axios.get(ADAFRUIT_DATA_TEMP_URL);
  const arrays = response.data;
  arrays.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
  const temps = arrays.map((item) => {
    return {
      value: +item.value,
      label: new Date(item.created_at).toLocaleString(),
    };
  });
  return temps;
};

export const getLatestTemp = async () => {
  const response = await axios.get(ADAFRUIT_DATA_TEMP_URL);
  const temp = {
    id: response.data[0].id,
    value: +response.data[0].value,
    date: new Date(response.data[0].created_at),
  };
  return temp;
};

export const getHumiChart = async () => {
    const response = await axios.get(ADAFRUIT_DATA_HUMI_URL);
    const arrays = response.data;
    arrays.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
    const humis = arrays.map((item) => {
    return {
      value: +item.value,
      label: new Date(item.created_at).toLocaleString(),
    };
  });
  return humis;
};

export const getLatestHumi = async () => {
  const response = await axios.get(ADAFRUIT_DATA_HUMI_URL);
  const humi = {
    id: response.data[0].id,
    value: +response.data[0].value,
    date: new Date(response.data[0].created_at),
  };
  return humi;
};

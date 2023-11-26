import weatherByDaysMapper from "./weatherByDays-mapper";

export default function modelMapper(payload) {
  const result = {
    id: "",
    country: null,
    city: null,
    list: {},
    currentTimeStampInfo: {},
    latitude: 0,
    longitude: 0,
  };

  const { currentTimeStampInfo, list } = weatherByDaysMapper(payload.list);
  result.country = payload.city.country;
  result.city = payload.city.name;
  result.list = list;
  result.currentTimeStampInfo = currentTimeStampInfo;
  result.latitude = payload.latitude;
  result.longitude = payload.longitude;
  result.id = payload.city.id;

  return result
}
